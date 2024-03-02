#!/bin/sh
# https://stackoverflow.com/q/36172442
# https://docs.npmjs.com/cli/v7/using-npm/config#prefix

sudo -u csye6225 bash -c "
    npm i --prefix /opt/csye6225/app
"

# removing as we are now using Cloud MySQL
# sudo -u csye6225 bash -c "
#     npm i --prefix /home/csye6225/app &&
#     npm i -D jest --prefix /home/csye6225/app
#     npm i -D supertest --prefix /home/csye6225/app
# "