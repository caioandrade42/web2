import sequelize from "./mysql.js";

function syncer(){
  try {
    sequelize.authenticate();
    sequelize.sync();
    sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
  console.success('Database connection established and models synchronized successfully.');
  return true;
}

export default syncer;
