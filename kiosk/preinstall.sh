#!/usr/bin/env bash
source colors

echo "Starting install $(date)" >> preinstall.log

if [ ! -f /etc/lsb-release ]; then
	echo -e "${RED}/etc/lsb-release not found"
	echo -e "This script must be run on Ubuntu or another Debian-based system. Quitting...${NC}"
	echo "This script must be run on Ubuntu or another Debian-based system. Quitting..." >> preinstall.log
	exit 1
fi
if [[ $EUID -eq 0 ]]; then
	echo -e "${RED}This script should not be run as root. Quitting... Run again as your local user.${NC}"
	echo "This script should not be run as root. Quitting... Run again as your local user." >> preinstall.log
	exit 1
fi

export USER=$(whoami)

# install node 12, python deps, and a human-memorable pw generator
echo -e "${BLUE}Installing dependencies${NC}"
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - >> preinstall.log 2>&1
sudo apt-get install -y nodejs python3-venv python3-dev docker.io libpam0g-dev >> preinstall.log 2>&1
pushd /tmp >> preinstall.log 2>&1
rm -f dashboard-passwdqc.tar.gz >> preinstall.log 2>&1
wget https://www.openwall.com/passwdqc/passwdqc-1.3.1.tar.gz -O dashboard-passwdqc.tar.gz >> preinstall.log 2>&1
tar -xzf dashboard-passwdqc.tar.gz >> preinstall.log 2>&1
cd passwdqc-1.3.1
make >> preinstall.log 2>&1
sudo make install >> preinstall.log 2>&1
popd >> preinstall.log 2>&1

# allow current user access to docker
echo -e "${BLUE}Configuring docker${NC}"
sudo systemctl enable docker >> preinstall.log 2>&1
sudo systemctl start docker >> preinstall.log 2>&1
sudo groupadd docker >> preinstall.log 2>&1
sudo usermod -a -G docker $USER >> preinstall.log 2>&1

echo -e "Finished install $(date)" >> preinstall.log
echo -e "${GREEN}Preinstall finished${NC}"
