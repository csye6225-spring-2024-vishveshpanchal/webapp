#!/bin/sh
# npm start --prefix /home/csye6225/app > /home/csye6225/app/npm_start.txt &&
sudo -u csye6225 bash -c "
    mkdir -p /home/csye6225/app/logs/ &&
    npm test --prefix /home/csye6225/app > /home/csye6225/app/logs/npm_test.txt
"