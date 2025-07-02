import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Cachorro = sequelize.define('Cachorro', {
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
    peso: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cor: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


export default Cachorro;