#!/bin/sh

sudo mkdir -p /opt/app

sudo touch /opt/app/healthcheck.sh

echo '#!/bin/bash' | sudo tee -a /opt/app/healthcheck.sh > /dev/null
echo 'sudo npm start --prefix /home/csye6225/app' | sudo tee -a /opt/app/healthcheck.sh > /dev/null

sudo chmod +x /opt/app/healthcheck.sh