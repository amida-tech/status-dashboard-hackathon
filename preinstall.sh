#!/usr/bin/env bash
if [ ! -f /etc/lsb-release ]; then
	echo "/etc/lsb-release not found"
	echo "This script must be run on Ubuntu or another Debian-based system. Quitting..."
	exit 1
fi

export USER=$(whoami)

echo "Configuring docker"
sudo apt-get install docker.io
sudo systemctl enable docker
sudo systemctl start docker
sudo groupadd docker
sudo usermod -a -G docker $USER
