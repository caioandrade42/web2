import sequelize from "../database/mysql.js";
import Pessoa from "./pessoa.js";
import Cachorro from "./cachorro.js";
import Quadro from "./quadro.js";
import { DataTypes } from "sequelize";

// Tabela de junção Pessoa-Cachorro
const PessoaCachorro = sequelize.define('PessoaCachorro', {
  pessoaId: {
    type: DataTypes.INTEGER,
    references: {
      model: Pessoa,
      key: 'id'
    }
  },
  cachorroId: {
    type: DataTypes.INTEGER,
    references: {
      model: Cachorro,
      key: 'id'
    }
  }
}, { timestamps: true });

// Associação N:N entre Pessoa e Cachorro
Pessoa.belongsToMany(Cachorro, {
  through: PessoaCachorro,
  foreignKey: 'pessoaId',
  otherKey: 'cachorroId',
  as: 'cachorros'
});

Cachorro.belongsToMany(Pessoa, {
  through: PessoaCachorro,
  foreignKey: 'cachorroId', 
  otherKey: 'pessoaId',
  as: 'donos'
});

// Associação 1:N entre Pessoa e Quadro
Pessoa.hasMany(Quadro, {
  foreignKey: {
    name: 'pessoaId',
    allowNull: true
  },
  as: 'quadros',
  onDelete: 'SET NULL'
});

Quadro.belongsTo(Pessoa, {
  foreignKey: {
    name: 'pessoaId',
    allowNull: true
  },
  as: 'pintor'
});

export { Pessoa, Cachorro, Quadro, PessoaCachorro };