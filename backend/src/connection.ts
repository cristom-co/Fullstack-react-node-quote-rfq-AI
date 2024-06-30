import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/database.sqlite',
  models: [ __dirname + "/models"]
});

export default sequelize;

