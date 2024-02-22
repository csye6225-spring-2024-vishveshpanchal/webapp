#!/bin/sh
# https://stackoverflow.com/a/17702044

touch /tmp/.env

{
    echo "NODE_ENV=$NODE_ENV"
    echo "PORT=$PORT"

    echo "DB_HOST=$DB_HOST"
    echo "DB_PORT=$DB_PORT"
    echo "DB_USERNAME=$DB_USERNAME"
    echo "DB_PASSWORD=$DB_PASSWORD"
    echo "DB_NAME=$DB_NAME"

    echo "DB_HOST_TEST=$DB_HOST_TEST"
    echo "DB_PORT_TEST=$DB_PORT_TEST"
    echo "DB_USERNAME_TEST=$DB_USERNAME_TEST"
    echo "DB_PASSWORD_TEST=$DB_PASSWORD_TEST"
    echo "DB_NAME_TEST=$DB_NAME_TEST"

    echo "DB_HOST_PROD=$DB_HOST_PROD"
    echo "DB_PORT_PROD=$DB_PORT_PROD"
    echo "DB_USERNAME_PROD=$DB_USERNAME_PROD"
    echo "DB_PASSWORD_PROD=$DB_PASSWORD_PROD"
    echo "DB_NAME_PROD=$DB_NAME_PROD"
} >> /tmp/.env

sudo mv /tmp/.env /home/csye6225/app/.env

# sudo -u csye6225 bash -c "
#     touch /home/csye6225/app/.env && 

#     echo 'NODE_ENV=development' >> /home/csye6225/app/.env && 
#     echo 'PORT=3000' >> /home/csye6225/app/.env && 

#     echo 'DB_HOST=localhost' >> /home/csye6225/app/.env && 
#     echo 'DB_PORT=3306' >> /home/csye6225/app/.env && 
#     echo 'DB_USERNAME=root' >> /home/csye6225/app/.env && 
#     echo 'DB_PASSWORD=\"\"' >> /home/csye6225/app/.env && 
#     echo 'DB_NAME=healthz_db' >> /home/csye6225/app/.env && 

#     echo 'DB_HOST_TEST=localhost' >> /home/csye6225/app/.env && 
#     echo 'DB_PORT_TEST=3306' >> /home/csye6225/app/.env && 
#     echo 'DB_USERNAME_TEST=root' >> /home/csye6225/app/.env && 
#     echo 'DB_PASSWORD_TEST=\"\"' >> /home/csye6225/app/.env && 
#     echo 'DB_NAME_TEST=healthz_db_test_1' >> /home/csye6225/app/.env && 

#     echo 'DB_HOST_PROD=localhost' >> /home/csye6225/app/.env && 
#     echo 'DB_PORT_PROD=3306' >> /home/csye6225/app/.env && 
#     echo 'DB_USERNAME_PROD=root' >> /home/csye6225/app/.env && 
#     echo 'DB_PASSWORD_PROD=\"\"' >> /home/csye6225/app/.env && 
#     echo 'DB_NAME_PROD=healthz_db_prod' >> /home/csye6225/app/.env
# "
