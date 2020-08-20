# ERP.AERO

---
ERP.AERO uses several technologies:

* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework 
* [MySQL(PhpMyAdmin Mamp)] - an open source object-relational database system.
* [Sequelize] - Promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server

###  Requirements
---
- [Node v14.8.0+](https://nodejs.org/en/download/current/)
- [Link to Postman Collection](https://www.getpostman.com/collections/1f18ebc7b8963e7193a3)

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
sequelize db:create
sequelize db:migrate


## Running Locally
---
```bash

# Running server: 
nodemon
```

   [MySQL(PhpMyAdmin Mamp)]: <https://www.mamp.info/en/downloads/>
   [Sequelize]: <https://sequelize.org/>
   [node.js]: <http://nodejs.org>
   [express]: <http://expressjs.com>
