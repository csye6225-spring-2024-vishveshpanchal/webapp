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

sudo mv /tmp/.env /opt/csye6225/app/.env