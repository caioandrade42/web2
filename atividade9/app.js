import express from "express";



const app = express();



app.get('/', (req, res) => {

    res.end('Hello Node.js');

});



app.listen(3000, () => {

    console.log('Escutando...');

});
