import express from "express";
import sequelize from "./database/mysql.js";

const app = express();
sequelize.authenticate();

app.use("/", (req, res) => {
    res.end("Eai meu fi");
});

app.listen(3000, () => {
    console.log('escutando');
});
