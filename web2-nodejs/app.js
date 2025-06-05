import express from "express";
import film_router from "./routers/film_router.js";
import actor_router from "./routers/actor_router.js";
import director_router from "./routers/director_router.js";
import syncer from './database/syncer.js';
import cachorro_router from "./routers/cachorro_router.js";
// import sequelize from "./database/mysql.js";
// sequelize.authenticate();

if (!syncer) {
    process.exit(1);
}

const app = express();
app.use(express.json());


app.get("/", (req, res) => {
    res.end('Rodando.');
});

app.use('/films', film_router);
app.use('/actors', actor_router);
app.use('/directors', director_router);
app.use('/cachorros', cachorro_router);
app.listen(3000, ()=>{
    console.log('Escutando.');
});