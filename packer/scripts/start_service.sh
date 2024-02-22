#!/bin/sh
# Using systemctl for .service files - https://www.youtube.com/watch?v=2gyKkgguyxE
# sudo systemctl start /etc/systemd/system/csye6225
# sudo systemctl status /etc/systemd/system/csye6225
# sudo systemctl end /etc/systemd/system/csye6225
# sudo systemctl enable /etc/systemd/system/csye6225
# sudo systemctl disable /etc/systemd/system/csye6225
# sudo systemctl daemon-reload
# sudo systemctl restart /etc/systemd/system/csye6225

sudo systemctl enable csye6225.service
sudo systemctl start csye6225.service
sudo systemctl daemon-reload
sudo systemctl restart csye6225.service

# sudo systemctl status csye6225.service | sudo tee /home/csye6225/app/logs/csye6225_service_status.txt