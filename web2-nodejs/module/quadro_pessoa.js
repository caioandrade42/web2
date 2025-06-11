import Pessoa from './pessoa.js';
import Quadro from './quadro.js';

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

export { Pessoa, Quadro };