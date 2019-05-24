#!/usr/bin/env bash
# color escape codes for pretty output
RED='\033[0;31m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m\e[?2004l'

echo "Starting install $(date)" >> install.log

# initial sanity checks
if [ ! -f /etc/lsb-release ]; then
	echo -e "${RED}/etc/lsb-release not found"
	echo -e "This script must be run on Ubuntu or another Debian-based system. Quitting...${NC}"
	exit 1
fi
if [[ $EUID -eq 0 ]]; then
	echo -e "${RED}This script should not be run as root. Quitting... Run again as your local user.${NC}"
	exit 1
fi

# prompt user whether to do kiosk setup, or just deploy code as systemd units
echo -e -n "${BLUE}Deploy kiosk-mode dashboard GUI? This requires LightDM (y/n)${NC} "
read answer
KIOSK_MODE=false
case ${answer:0:1} in
	y|Y )
		KIOSK_MODE=true
		if [ ! -d /etc/lightdm ]; then
			echo -e "${RED}/etc/lightdm not found"
			echo -e "This script must be run on Ubuntu MATE (or another Debian-based system with LightDM as the default login manager). Quitting...${NC}"
			exit 1
		fi
	;;
esac
echo

export BASEDIR="$( cd "$(dirname "$0")" ; pwd -P )"
pushd $BASEDIR >> install.log 2>&1

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
	echo -e "${YELLOW}Write down the following user details in a safe place (e.g., 1Password). You will not see them again.${NC}"
	echo -e "${YELLOW}    Username:${GREEN} $USER${NC}"
	echo -e "${YELLOW}    Password:${GREEN} $PASSWORD${NC}"
	echo -e -n "${BLUE}Hit enter when done${NC}"
	read
fi

echo -e -n "${BLUE}Change $PRIVILEGED_USER user password (y/n)?${NC} "
read answer
case ${answer:0:1} in
	y|Y )
		# do *not* export this, else it may inadvertently be passed to envsubst
		PASSWORD="$(pwqgen random=64)"
		echo "$PRIVILEGED_USER:$PASSWORD" | sudo chpasswd
		echo -e "${YELLOW}Write down the following privileged user details in a safe place (e.g., 1Password). You will not see them again.${NC}"
		echo -e "${YELLOW}    Username:${GREEN} $PRIVILEGED_USER${NC}"
		echo -e "${YELLOW}    Password:${GREEN} $PASSWORD${NC}"
		echo -e -n "${BLUE}Hit enter when done${NC}"
		read
	;;
	* )
		echo "Skipping password change"
	;;
esac

echo
echo -e "${BLUE}Copy the kubecfg file from ~/.kube/config on your machine to $BASEDIR/kubecfg${NC}"
echo -e -n "${BLUE}Hit enter when done${NC}"
read
echo

echo -e -n "${BLUE}WMATA API Key: ${NC}"
read WMATA_API_KEY
echo -e -n "${BLUE}Uber API Key: ${NC}"
read UBER_KEY
echo -e -n "${BLUE}Darksky API Key: ${NC}"
read DARKSKY_KEY
echo -e -n "${BLUE}Contents of Google Calendar credentials.json (from https://developers.google.com/calendar/quickstart/nodejs): ${NC}"
read GCAL_CREDENTIALS
export WMATA_API_KEY
export UBER_KEY
export DARKSKY_KEY
export GCAL_CREDENTIALS

echo "Stopping existing services"
sudo systemctl stop amida-dashboard-frontend >> install.log 2>&1
sudo systemctl stop amida-dashboard-transit >> install.log 2>&1
sudo systemctl stop amida-dashboard-calendar >> install.log 2>&1
sudo systemctl stop amida-dashboard-k8s >> install.log 2>&1

echo "Setting up frontend"
envsubst < frontend/src/config.envsubst.js > frontend/src/config.js
# frontend/setup.sh >> install.log 2>&1

echo "Setting up transit service"
envsubst < backends/transit/.env.envsubst > backends/transit/.env
# backends/transit/setup.sh >> install.log 2>&1

echo "Setting up calendar service"
envsubst < backends/calendar/credentials.envsubst.json > backends/calendar/credentials.json
# backends/calendar/setup.sh >> install.log 2>&1

echo "Setting up kubernetes service"
envsubst < backends/k8s-status-service/setup.envsubst.sh > backends/k8s-status-service/setup.sh
chmod +x backends/k8s-status-service/setup.sh
sudo backends/k8s-status-service/setup.sh >> install.log 2>&1

echo "Setting up service units"
envsubst < share/amida-dashboard-frontend.service | sudo tee /etc/systemd/system/amida-dashboard-frontend.service >> install.log
envsubst < share/amida-dashboard-transit.service | sudo tee /etc/systemd/system/amida-dashboard-transit.service >> install.log
envsubst < share/amida-dashboard-calendar.service | sudo tee /etc/systemd/system/amida-dashboard-calendar.service >> install.log
envsubst < share/amida-dashboard-k8s.service | sudo tee /etc/systemd/system/amida-dashboard-k8s.service >> install.log
sudo systemctl daemon-reload >> install.log 2>&1
sudo systemctl enable amida-dashboard-frontend >> install.log 2>&1
sudo systemctl start amida-dashboard-frontend >> install.log 2>&1
sudo systemctl enable amida-dashboard-transit >> install.log 2>&1
sudo systemctl start amida-dashboard-transit >> install.log 2>&1
sudo systemctl enable amida-dashboard-calendar >> install.log 2>&1
sudo systemctl start amida-dashboard-calendar >> install.log 2>&1
sudo systemctl enable amida-dashboard-k8s >> install.log 2>&1
sudo systemctl start amida-dashboard-k8s >> install.log 2>&1

if [ "$KIOSK_MODE" = true ]; then
	echo
	echo "Setting up browser autostart"
	sudo mkdir -p $HOMEDIR/.config/autostart
	sudo cp share/dashboard.desktop $HOMEDIR/.config/autostart/dashboard.desktop
	# disable auto screen lock
	sudo -u $USER HOME=/home/$USER dbus-launch --exit-with-session gsettings set org.gnome.settings-daemon.plugins.power sleep-inactive-ac-timeout 0 >> install.log 2>&1

	echo -e -n "${BLUE}Press enter to restart lightdm${NC}"
	read
	sudo systemctl restart lightdm >> install.log 2>&1
fi

popd >> install.log 2>&1

echo -e "${GREEN}Install finished${NC}"
