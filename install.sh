#!/usr/bin/env bash
# initial sanity checks
if [ ! -f /etc/lsb-release ]; then
	echo "/etc/lsb-release not found"
	echo "This script must be run on Ubuntu or another Debian-based system. Quitting..."
	exit 1
fi
if [[ $EUID -eq 0 ]]; then
	echo "This script should not be run as root. Quitting... Run again as your local user."
	exit 1
fi

# prompt user whether to do kiosk setup, or just deploy code as systemd units
read -p "Deploy kiosk-mode dashboard GUI? This requires LightDM (y/n) " answer
KIOSK_MODE=false
case ${answer:0:1} in
	y|Y )
		KIOSK_MODE=true
		if [ ! -d /etc/lightdm ]; then
			echo "/etc/lightdm not found"
			echo "This script must be run on Ubuntu MATE (or another Debian-based system with LightDM as the default login manager). Quitting..."
			exit 1
		fi
	;;
esac

export BASEDIR="$( cd "$(dirname "$0")" ; pwd -P )"
pushd $BASEDIR

export USER=dashboard
export PRIVILEGED_USER=$(whoami)
export DOCKER_USER=$PRIVILEGED_USER
export HOMEDIR=/home/$USER
if id $USER >/dev/null 2>&1; then
	echo "$USER already exists; skipping creation"
else
	echo "Creating non-privileged user"
	# do *not* export this, else it may inadvertently be passed to envsubst
	PASSWORD="$(pwqgen random=64)"
	sudo adduser $USER --gecos "Dashboard,,," --disabled-password
	echo "$USER:$PASSWORD" | sudo chpasswd
	echo "Write down the following user details in a safe place (e.g., 1Password). You will not see them again."
	echo "    Username: $USER"
	echo "    Password: $PASSWORD"
	read -p "Hit enter when done"
fi

read -p "Change $PRIVILEGED_USER user password (y/n)? " answer
case ${answer:0:1} in
	y|Y )
		# do *not* export this, else it may inadvertently be passed to envsubst
		PASSWORD="$(pwqgen random=64)"
		echo "$PRIVILEGED_USER:$PASSWORD" | sudo chpasswd
		echo "Write down the following privileged user details in a safe place (e.g., 1Password). You will not see them again."
		echo "    Username: $PRIVILEGED_USER"
		echo "    Password: $PASSWORD"
		read -p "Hit enter when done"
	;;
	* )
		echo "Skipping password change"
	;;
esac

echo "Copy the kubecfg file from ~/.kube/config on your machine to $BASEDIR/kubecfg"
read -p "Hit enter when done"

read -p "WMATA API Key: " WMATA_API_KEY
read -p "Uber API Key: " UBER_KEY
read -p "Darksky API Key: " DARKSKY_KEY
read -p "Contents of Google Calendar credentials.json (from https://developers.google.com/calendar/quickstart/nodejs): " GCAL_CREDENTIALS
export WMATA_API_KEY
export UBER_KEY
export DARKSKY_KEY
export GCAL_CREDENTIALS

echo "Stopping existing services"
sudo systemctl stop amida-dashboard-frontend
sudo systemctl stop amida-dashboard-transit
sudo systemctl stop amida-dashboard-calendar
sudo systemctl stop amida-dashboard-k8s

echo "Setting up frontend"
envsubst < frontend/src/config.envsubst.js > frontend/src/config.js
# frontend/setup.sh

echo "Setting up transit service"
envsubst < backends/transit/.env.envsubst > backends/transit/.env
# backends/transit/setup.sh

echo "Setting up calendar service"
envsubst < backends/calendar/credentials.envsubst.json > backends/calendar/credentials.json
# backends/calendar/setup.sh

echo "Setting up kubernetes service"
envsubst < backends/k8s-status-service/setup.envsubst.sh > backends/k8s-status-service/setup.sh
chmod +x backends/k8s-status-service/setup.sh
# sudo backends/k8s-status-service/setup.sh

echo "Setting up service units"
envsubst < share/amida-dashboard-frontend.service | sudo tee /etc/systemd/system/amida-dashboard-frontend.service
envsubst < share/amida-dashboard-transit.service | sudo tee /etc/systemd/system/amida-dashboard-transit.service
envsubst < share/amida-dashboard-calendar.service | sudo tee /etc/systemd/system/amida-dashboard-calendar.service
envsubst < share/amida-dashboard-k8s.service | sudo tee /etc/systemd/system/amida-dashboard-k8s.service
sudo systemctl daemon-reload
sudo systemctl enable amida-dashboard-frontend
sudo systemctl start amida-dashboard-frontend
sudo systemctl enable amida-dashboard-transit
sudo systemctl start amida-dashboard-transit
sudo systemctl enable amida-dashboard-calendar
sudo systemctl start amida-dashboard-calendar
sudo systemctl enable amida-dashboard-k8s
sudo systemctl start amida-dashboard-k8s

echo "Setting up browser autostart"
if [ "$KIOSK_MODE" = true ]; then
	sudo mkdir -p $HOMEDIR/.config/autostart
	sudo cp share/dashboard.desktop $HOMEDIR/.config/autostart/dashboard.desktop
	# disable auto screen lock
	sudo -u $USER HOME=/home/$USER dbus-launch --exit-with-session gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0

	read -p "Press enter to restart lightdm"
	sudo systemctl restart lightdm
fi

popd
