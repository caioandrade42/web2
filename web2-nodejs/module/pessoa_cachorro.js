import Pessoa from './pessoa.js';
import Cachorro from './cachorro.js';

Pessoa.belongsToMany(Cachorro, { through: 'PessoaCachorro' });
Cachorro.belongsToMany(Pessoa, { through: 'PessoaCachorro' });

export { Pessoa, Cachorro };