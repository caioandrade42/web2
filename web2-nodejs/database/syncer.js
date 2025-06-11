import sequelize from "./mysql.js";
import Director from "../module/director.js";
import Film from "../module/film.js";
import Actor from "../module/actor.js";

function syncer(){
  try {
    sequelize.authenticate();
    sequelize.sync();
    Film.belogsTo(Director);
    Director.hasMany(Film);
    Film.belongsToMany(Actor, {through: 'Film_Director'});
    Actor.belongsToMany(Film, {through: 'Film_Actor'});
    sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
  console.success('Database connection established and models synchronized successfully.');
  return true;
}

export default syncer;
