import { DataTypes } from "sequelize";
import sequelize from "../database/mysql.js";

const Quadro = sequelize.define('Quadro', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pessoaId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'Quadros',
    timestamps: true
});

export default Quadro;