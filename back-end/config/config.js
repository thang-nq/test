require('dotenv').config()


module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      },

    },
  },
  "test": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      },

    },
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
