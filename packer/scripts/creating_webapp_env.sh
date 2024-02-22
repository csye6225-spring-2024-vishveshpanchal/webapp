#!/bin/sh
# https://stackoverflow.com/a/17702044
# echo 'hello' >> /home/csye6225/app/.env
# echo 'my-texts' >> /home/csye6225/app/.env
sudo -u csye6225 bash -c "
    touch /home/csye6225/app/.env && 

    echo 'NODE_ENV=development' >> /home/csye6225/app/.env && 
    echo 'PORT=3000' >> /home/csye6225/app/.env && 

    echo 'DB_HOST=localhost' >> /home/csye6225/app/.env && 
    echo 'DB_PORT=3306' >> /home/csye6225/app/.env && 
    echo 'DB_USERNAME=root' >> /home/csye6225/app/.env && 
    echo 'DB_PASSWORD=\"\"' >> /home/csye6225/app/.env && 
    echo 'DB_NAME=healthz_db' >> /home/csye6225/app/.env && 

    echo 'DB_HOST_TEST=localhost' >> /home/csye6225/app/.env && 
    echo 'DB_PORT_TEST=3306' >> /home/csye6225/app/.env && 
    echo 'DB_USERNAME_TEST=root' >> /home/csye6225/app/.env && 
    echo 'DB_PASSWORD_TEST=\"\"' >> /home/csye6225/app/.env && 
    echo 'DB_NAME_TEST=healthz_db_test_1' >> /home/csye6225/app/.env && 

    echo 'DB_HOST_PROD=localhost' >> /home/csye6225/app/.env && 
    echo 'DB_PORT_PROD=3306' >> /home/csye6225/app/.env && 
    echo 'DB_USERNAME_PROD=root' >> /home/csye6225/app/.env && 
    echo 'DB_PASSWORD_PROD=\"\"' >> /home/csye6225/app/.env && 
    echo 'DB_NAME_PROD=healthz_db_prod' >> /home/csye6225/app/.env
"