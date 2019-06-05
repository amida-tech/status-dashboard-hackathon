# Dashboard Kiosk

This directory contains scripts to automate setup of the dashboard to a Raspberry Pi or similar (the guide below uses an Odroid XU4) connected to a TV screen. The end result is a device that will boot to a login screen, prompt for a password (for security reasons), and then show the dashboard.

All backend services, in addition to the frontend, run from the device as systemd units, with the k8s service running as a Docker container wrapped in a systemd unit.

Installation is fully automated into scripts: `preinstall.sh`, and `install.sh`. Run `preinstall.sh`, restart your shell, 
and then run `install.sh`. For detailed instructions, see below.

For security reasons
- Setup is done with a more privileged user (e.g. `odroid`).
- The dashboard runs as a less privileged user (e.g. `dashboard`).

# Enviroment

The setup scripts below will prompt you for various configuration values

- WMATA API key
- Uber API key
- Darksy API key
- Contents of `Google Calendar credentials.json`
- A kubeconfig file

## The kubeconfig file

(This assumes you have basic knowledge of kubernetes and [kubeconfig](https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/) files)

### Specs Overview (your kubeconfig file needs...)

- Cluster: Our k8s cluster.
- User: The status dashboard service account.
  - Note 1: This user and its roles/permissions are already setup in the cluster; k8s config files and info regarding this user are in Amida's `k8s-config` repo.
  - Note 2: In the kubeconfig yaml file, this user's `token` member needs to be the token (not base-64 encoded) derrived from the secret of the status dashboard service account, per the instructions below.
- Context: cluster = our k8s cluster, namespace = default, and user = the status dashboard service account.
- Currrent context: The name of the aforementioned context.

### Example

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: REDACTED (get it from a kubeconfig file of any machine already setup to work with our cluster)
    server: REDACTED (get it from a kubeconfig file of any machine already setup to work with our cluster)
  name: REDACTED (get it from a kubeconfig file of any machine already setup to work with our cluster)
contexts:
- context:
    cluster: REDACTED (set to same value as clusters > name above)
    user: REDACTED (set to same value as users > name below)
  name: REDACTEDCLUSTERNAME__default__REDACTEDSERVICEACCOUNTNAME
current-context: REDACTED (set to same value as contexts > name above)
kind: Config
preferences: {}
users:
- name: REDACTED (get it from `kubectl get serviceaccounts`)
  user:
    token: REDACTED (get it via the process below)
```

### The kubeconfig file user token

```sh
secret=$(kubectl get sa THE_SERVICE_ACCOUNT_NAME -o json | jq -r .secrets[].name)
user_token=$(kubectl get secret $secret -o json | jq -r '.data["token"]' | base64 -D)
```

Then plug `user_token` into your kubeconfig yaml file.

For background details, see
- https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/
- https://stackoverflow.com/questions/42170380/how-to-add-users-to-kubernetes-kubectl

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
