# ERP.AERO

### Tech
---
ERP.AERO uses several technologies:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [MySQL] - an open source object-relational database system.
* [Sequelize] - Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server

###  Requirements
---
- [Node v14.8.0+](https://nodejs.org/en/download/current/)

###  Getting Started
---
Clone the repo and make it yours:


```bash
git clone https://github.com/akhmetkarimov/ERP.AERO.git
cd ERP.AERO
```
    

### Installation
---
```bash
# Install server dependencies:
npm i

## Database configuration
---
In config.json change development database configurations(databasename, username, password).
```bash
# Migrate database using sequelize-cli.
cd server
sequelize db:create
sequelize db:migrate


## Running Locally
---
```bash

# Running server: 
nodemon
```

   [PostgreSQL]: <https://www.postgresql.org/>
   [Sequelize]: <https://sequelize.org/>
   [ReactJS]: <https://reactjs.org/>
   [Monako Editor]: <https://microsoft.github.io/monaco-editor/>
   [Redux]: <https://redux.js.org/>
   [AntDesign]: <https://ant.design/>
   [Mocha]: <https://mochajs.org/>
   [Chai]: <https://www.chaijs.com/>
   [Seed Barista]: <https://github.com/helpscout/seed-barista>
   [Docker and Docker-compose]: <https://www.docker.com/products/docker-desktop>
   [Webpack]: <https://webpack.js.org/>
   [CKEditor]: <https://ckeditor.com/>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
