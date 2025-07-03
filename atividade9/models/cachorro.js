import {DataTypes} from 'sequelize';
import sequelize from '../database/mysql.js';
import Pessoa from './pessoa.js';

const Cachorro = sequelize.define('Cachorro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    raca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'cachorros',
    timestamps: false
});

export default Cachorro;