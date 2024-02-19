# Assignment 02

### CSYE 6225 - Network Structure & Cloud Computing (Spring 2024)
Vishvesh Ashwinbhai Panchal - NUID: 002812718

## Building the application
###### Directory creation
* Open the folder in Visual Studio Code where you want to create the project
* Open terminal (integrated works fine), and implement the following commands one after the other
```
mkdir app
cd app/
npm init
npm i node
npm i express dotenv
npm i sequelize
npm i mysql2
touch .env
npx gitignore node
npm i nodemon -D
npm i sequelize-cli -D
npx sequelize-cli init
npm i bcrypt
npm i jest
npm i -D supertest
```
* Rename app/config/config.json file to app/config/config.js
* Changing relevant code while following steps from the [reference YouTube video](https://www.youtube.com/watch?v=VyEKwp6Q4fY)

## References
* https://www.npmjs.com/package/sequelize-noupdate-attributes
* https://sequelize.org/docs/v6/core-concepts/model-basics/


## Zipping Files
```
zip -r webapp-fork.zip webapp-fork -x ./webapp-fork/node_modules/\* -x ./webapp-fork/migrations/\* -x ./webapp-fork/.env -x ./webapp-fork/seeders/\* -x ./webapp-fork/.git/\* -x ./webapp-fork/.github/\*
```
