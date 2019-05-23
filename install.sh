#!/usr/bin/env bash
if [ ! -f /etc/lsb-release ]; then
	echo "/etc/lsb-release not found"
	echo "This script must be run on Ubuntu MATE (or another Debian-based system with LightDM as the default login manager). Quitting..."
	exit 1
fi
if [ ! -d /etc/lightdm ]; then
	echo "/etc/lightdm not found"
	echo "This script must be run on Ubuntu MATE (or another Debian-based system with LightDM as the default login manager). Quitting..."
	exit 1
fi

export BASEDIR="$( cd "$(dirname "$0")" ; pwd -P )"
export USER="$(whoami)"
pushd $BASEDIR

read -p "WMATA API Key: " WMATA_API_KEY
read -p "Uber API Key: " UBER_KEY
read -p "Darksky API Key: " DARKSKY_KEY
read -p "Contents of Google Calendar credentials.json (from https://developers.google.com/calendar/quickstart/nodejs): " GCAL_CREDENTIALS
export WMATA_API_KEY
export UBER_KEY
export DARKSKY_KEY
export GCAL_CREDENTIALS

echo "Installing dependencies"
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs python3-venv python3-dev

echo "Stopping existing services"
systemctl --user stop amida-dashboard-frontend
systemctl --user stop amida-dashboard-transit
systemctl --user stop amida-dashboard-calendar
systemctl --user stop amida-dashboard-k8s

echo "Setting up frontend"
envsubst < frontend/src/config.envsubst.js > frontend/src/config.js
frontend/setup.sh

echo "Setting up transit service"
envsubst < backends/transit/.env.envsubst > backends/transit/.env
backends/transit/setup.sh

echo "Setting up calendar service"
envsubst < backends/calendar/credentials.envsubst.json > backends/calendar/credentials.json
backends/calendar/setup.sh

echo "Setting up kubernetes service"
backends/k8s-status-service/setup.sh

echo "Setting up service units"
mkdir -p ~/.config/systemd/user
envsubst < share/amida-dashboard-frontend.service > ~/.config/systemd/user/amida-dashboard-frontend.service
envsubst < share/amida-dashboard-transit.service > ~/.config/systemd/user/amida-dashboard-transit.service
envsubst < share/amida-dashboard-calendar.service > ~/.config/systemd/user/amida-dashboard-calendar.service
envsubst < share/amida-dashboard-k8s.service > ~/.config/systemd/user/amida-dashboard-k8s.service
systemctl --user daemon-reload
systemctl --user enable amida-dashboard-frontend
systemctl --user start amida-dashboard-frontend
systemctl --user enable amida-dashboard-transit
systemctl --user start amida-dashboard-transit
systemctl --user enable amida-dashboard-calendar
systemctl --user start amida-dashboard-calendar
systemctl --user enable amida-dashboard-k8s
systemctl --user start amida-dashboard-k8s

echo "Setting up browser autostart"
mkdir -p ~/.config/autostart
envsubst < share/50-autologin.conf | sudo tee /etc/lightdm/lightdm.conf.d/50-autologin.conf
cp share/dashboard.desktop ~/.config/autostart/dashboard.desktop

read -p "Press enter to restart lightdm into browser kiosk mode"
sudo systemctl restart lightdm

popd
