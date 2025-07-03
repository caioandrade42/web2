import { criaPessoa, listaPessoas, editPessoa, deletePessoa } from '../../controllers/api/pessoa_controller.js';
import {Router} from 'express';

const pessoa_router = Router();
pessoa_router.post('/', criaPessoa);
pessoa_router.get('/', listaPessoas);
pessoa_router.put('/', editPessoa);
pessoa_router.delete('/', deletePessoa);

export default pessoa_router;