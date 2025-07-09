import sequelize from './mysql';
import Pessoa from '../models/pessoa';
import Quadro from '../models/quadro';
import Cachorro from '../models/cachorro';

async function syncer() {
  try{
    await sequelize.authenticate();
    Cachorro.sync({ alter: true });
    Quadro.sync({ alter: true });
    Pessoa.sync({ alter: true });
    Pessoa.hasMany(Quadro);
    Cachorro.belongsToMany(Pessoa, { through: 'Pessoa_cachorro'});
    Quadro.belongsTo(Pessoa);
    Pessoa.belongsToMany(Cachorro, { through: 'Pessoa_cachorro'});
    await sequelize.sync();
  }catch(error){
    console.error('Erro ao acessar a base de dados:', error);
    return false;
  }
  return true;
}

export default syncer;