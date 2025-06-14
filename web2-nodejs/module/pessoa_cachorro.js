import Pessoa from './pessoa.js';
import Cachorro from './cachorro.js';
import { DataTypes } from 'sequelize';
import sequelize from '../database/mysql.js';

const PessoaCachorro = sequelize.define('PessoaCachorro', {
}, {
  tableName: 'PessoaCachorro'
});
Pessoa.belongsToMany(Cachorro, { through: 'PessoaCachorro' });
Cachorro.belongsToMany(Pessoa, { through: 'PessoaCachorro' });

export { Pessoa, Cachorro, PessoaCachorro };