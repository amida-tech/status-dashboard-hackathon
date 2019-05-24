#!/usr/bin/env bash
if [ ! -f /etc/lsb-release ]; then
	echo "/etc/lsb-release not found"
	echo "This script must be run on Ubuntu or another Debian-based system. Quitting..."
	exit 1
fi
if [[ $EUID -eq 0 ]]; then
	echo "This script should not be run as root. Quitting... Run again as your local user."
	exit 1
fi

export USER=$(whoami)

echo "Installing dependencies"
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs python3-venv python3-dev docker.io libpam0g-dev
pushd /tmp
rm -f dashboard-passwdqc.tar.gz
wget https://www.openwall.com/passwdqc/passwdqc-1.3.1.tar.gz -O dashboard-passwdqc.tar.gz
tar -xzf dashboard-passwdqc.tar.gz
cd passwdqc-1.3.1
make
sudo make install
popd

echo "Configuring docker"
sudo systemctl enable docker
sudo systemctl start docker
sudo groupadd docker
sudo usermod -a -G docker $USER
