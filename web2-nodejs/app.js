import express from "express";
import { create } from "express-handlebars";
import syncer from './database/syncer.js';
import cachorro_router from "./routers/api/cachorro_router.js";
import pessoa_router_web from './routers/web/pessoa_router_web.js';
import quadro_router from './routers/api/quadro_router.js';

// import sequelize from "./database/mysql.js";
// sequelize.authenticate();

if (!syncer) {
    process.exit();
}

const app = express();
const hbs = create({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: './views/layouts/',
    partialsDir: './views/partials/'
});
app.use(express.json());

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views' , './views');


app.get("/", (req, res) => {
    res.render('home');
});

app.use('/cachorros', cachorro_router);
app.use('/pessoas', pessoa_router_web);
app.use('/quadros' , quadro_router);
app.listen(3000, ()=>{
    console.log('Escutando.');
});