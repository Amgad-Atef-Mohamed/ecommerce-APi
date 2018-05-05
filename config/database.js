'use strict';

module.exports  = {
  "development": {
    "username": "root",
    "password": process.env.MYSQL_PASS || "123456",
    "database": "task",
    "host": process.env.MYSQL_HOST|| "127.0.0.1",
    "dialect": "mysql"
  }
};
