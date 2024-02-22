#!/bin/sh

sudo mv /tmp/csye6225.service /etc/systemd/system/

# sudo touch /etc/systemd/system/csye6225.service
# echo '[Unit]' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'Description=CSYE 6225 App' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'After=network.target' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo '' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo '[Service]' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'Type=simple' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'User=csye6225' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'Group=csye6225' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'WorkingDirectory=/opt/app' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'ExecStart=/opt/app/healthcheck.sh' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'Restart=always' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'RestartSec=3' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'StandardOutput=syslog' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'StandardError=syslog' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'SyslogIdentifier=csye6225' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo '' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo '[Install]' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
# echo 'WantedBy=multi-user.target' | sudo tee -a /etc/systemd/system/csye6225.service > /dev/null
