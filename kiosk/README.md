# Dashboard Kiosk

This directory contains scripts to automate setup of the dashboard to a Raspberry Pi or similar (the guide below uses an Odroid XU4) connected to a TV screen. The end result is a device that will boot to a login screen, prompt for a password (for security reasons), and then show the dashboard.

All backend services, in addition to the frontend, run from the device as systemd units, with the k8s service running as a Docker container wrapped in a systemd unit.

Installation is fully automated into scripts: `preinstall.sh`, and `install.sh`. Run `preinstall.sh`, restart your shell, 
and then run `install.sh`. For detailed instructions, see below.

For security reasons
- Setup is done with a more privileged user (`odroid`).
- The dashboard runs as a less privileged user (`dashboard`).

# Installation Instructions

* Boot a Odroid XU4 or similar into the latest Ubuntu MATE. Note the IP address either from startup logs or by logging in and running `ip addr`. This guide assumes an Ethernet connection, otherwise use Network Manager inside the GUI (or `nm` cli) to configure a wireless connection.

* SSH in (default username/password for Odroid Ubuntu MATE variant is `odroid`/`odroid`).

* Install git (`sudo apt-get install -y git`). If you do not want to wait for Ubuntu's auto-updates to finish taking place (this can be quite a while after a fresh boot), switch `APT::Periodic::Update-Package-Lists` to `0` in `/etc/apt/apt.conf.d/20auto-upgrades` and reboot. Remember to change back to `1` after installing the dashboard!

* Clone this git repo (`git clone git@github.com:amida-tech/status-dashboard-hackathon.git`), and enter the `kiosk` directory (`cd status-dashboard-hackathon/kiosk`).

* Run the preinstallation script with `./preinstall.sh`. This may take a few minutes to complete, you can watch progress with `tail -f preinstall.log`.

* Exit your shell, and then SSH back in. This step is vital, as otherwise group membership updates will not be reflected and your local user will not have access to Docker. Navigate to the `kiosk` directory again.

* Run `install.sh`, and follow the on-screen prompts. When prompted, change the `odroid` user password unless you have an extremely good reason not to. Make sure to write down the printed passwords: you will not see these again. When prompted, use `scp ~/.kube/config odroid@HOST:status-dashboard-hackathon/kubecfg` to copy `kubecfg`. Find the relevant API keys in 1Password.

* Login as `dashboard` in the GUI login manager, and admire the dashboard. In future logins, `dashboard` will be the default selected user.

* Remember to re-enable auto-upgrades if you disabled them in step 3.
