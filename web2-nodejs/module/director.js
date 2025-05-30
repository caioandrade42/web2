import {DataTypes} from "sequelize";
import sequelize from "../database/mysql.js";
const Director = sequelize.define('Director', {
    name: DataTypes.STRING,
    birthdate: DataTypes.DATE
});

export default Director;