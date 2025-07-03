import {DataTypes} from 'sequelize';
import sequelize from '../database/mysql.js';
import Pessoa from './pessoa.js';

const Quadro = sequelize.define('Quadro', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ano: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'quadros',
    timestamps: false
});

export default Quadro;