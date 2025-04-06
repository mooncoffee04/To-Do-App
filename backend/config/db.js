const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'postgres',       // Change this if your DB has a different name
  'postgres',      // Superuser
  'lavu',          // Password
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

module.exports = sequelize;