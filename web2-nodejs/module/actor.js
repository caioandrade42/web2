import {DataTypes} from "sequelize";
import sequelize from "../database/mysql.js";

const Actor = sequelize.define('Actor', {
    nome: DataTypes.STRING,
    datanasc: DataTypes.DATE
});

export default Actor;