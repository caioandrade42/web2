import {addPessoa, listPessoas, editPessoa, deletePessoa, buscaPessoaPorId} from '../../controllers/web/pessoa_controller.js';
import { Router } from 'express';
const pessoa_router_web = Router();
pessoa_router_web.get('/', listPessoas);
pessoa_router_web.get('/buscauma' , buscaPessoaPorId);
pessoa_router_web.post('/create', addPessoa);
pessoa_router_web.put('/save', editPessoa);
pessoa_router_web.delete('/delete', deletePessoa);
export default pessoa_router_web;