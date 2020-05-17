# Library
BackEnd Of Books API Using NodeJS MySQL ExpressJS

## Build Setup
1.Clone ```$ https://github.com/RinaLia/Library```
2. Install depedencies
```

# with npm
$ npm install

# or with yarn
$ yarn install
```
3. Setup your environment variable in ```.env``` files (if not exists, create your own).
```
DB_HOST      = 'localhost'
DB_USER      = 'root'
DB_PASSWORD  = 'xxx'
DB_DATABASE  = 'dbname'
```

## Stacks
* NodeJS
* ExpressJS
* MySQL

## Dependencies
* [ExpressJs](#ExpressJs)- The server for handling and routing HTTP requests
* [dotenv ](#dotenv)- is a zero-dependency module that loads environment variables from a ```.env``` file into ```process.env```
* [Mysql](#setup)- NodeJs driver for MySQL
* [body-parser ](#body-parser)- Node.js body parsing middleware
* [Nodemon](#Nodemon)- is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [Multer](#Multer)- Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
* [CORS](#CORS)- CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Aplication Structure
* ```index.js```- Entry point of our aplication
* ```src/config```- This folder contain configuration files of our app, such as mysql connection
* ```src/models```- This folder containt files that define query of MysQL
* ```src/routes```- Route of our app going here
* ```src/controllers```- This folder contain configuration files that links Models to Route




