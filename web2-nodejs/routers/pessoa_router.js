import express from 'express';
import { addPessoa, getAllPessoas, getPessoaById, associarCachorro } from '../controllers/pessoa_controller.js';

const pessoa_router = express.Router();


pessoa_router.post('/pessoas', addPessoa);


pessoa_router.get('/pessoas', getAllPessoas);


pessoa_router.get('/pessoas/:id', getPessoaById);


pessoa_router.post('/pessoas/associar-cachorro', associarCachorro);

export default pessoa_router;