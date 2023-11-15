const { Sequelize } = require("sequelize");
const { postgresConfig } = require("./config");

const sequelize = new Sequelize(
  postgresConfig.name,
  postgresConfig.user,
  postgresConfig.password,
  {
    host: postgresConfig.host,
    port: postgresConfig.port,
    dialect: "postgres",
  }
);
const modelDefiners = [
  require('../src/models/User')
]

modelDefiners.forEach((model)=> model(sequelize))

module.exports = {
  ...sequelize.models,
  db: sequelize
};
