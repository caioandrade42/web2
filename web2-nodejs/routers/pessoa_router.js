import express from 'express';
import { addPessoa, getAllPessoas, getPessoaById, associarCachorro } from '../controllers/pessoa_controller.js';

const pessoa_router = express.Router();


pessoa_router.post('/', addPessoa);


pessoa_router.get('/', getAllPessoas);


pessoa_router.get('/:id', getPessoaById);


pessoa_router.post('/associar-cachorro', associarCachorro);

export default pessoa_router;