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
```
* Rename app/config/config.json file to app/config/config.js
* Changing relevant code while following steps from the [reference YouTube video](https://www.youtube.com/watch?v=VyEKwp6Q4fY)

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](/image/sample.webp "This is a sample image.")

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

```
let message = 'Hello world';
alert(message);
```

## Inline code

This web site is using `markedjs/marked`.

## References
* https://www.npmjs.com/package/sequelize-noupdate-attributes
* https://sequelize.org/docs/v6/core-concepts/model-basics/
* 