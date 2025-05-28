import getCidades from "./funcoes.js";
const dados = await getCidades("MG");
console.log(dados);

// server.mjs
import { createServer } from 'node:http';
const server = createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'aplication/json' });
    res.end('Hello World!\n');
});
// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
// run with `node server.mjs`