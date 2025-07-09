import {DataTypes} from 'sequelize';
import sequelize from '../database/mysql.js';
import Cachorro from './cachorro.js';
import Quadro from './quadro.js';

const Pessoa = sequelize.define('Pessoa', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dataNascimento: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'pessoas',
    timestamps: false
});

export default Pessoa;