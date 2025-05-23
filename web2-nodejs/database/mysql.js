import {Sequelize} from '../config/mysql.js';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username : 'root',
    password : 'root',
    database : 'web2_nodejs'
});

export default sequelize;