#!/bin/sh
# https://support.stackpath.com/hc/en-us/articles/360025308732-Add-Users-to-a-Virtual-Machine
# https://www.baeldung.com/linux/create-non-login-user -> Use: 2.2. Creating a nologin Normal User
sudo adduser csye6225 --shell /usr/sbin/nologin
