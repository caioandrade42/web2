import { criaQuadro, listaQuadros, editQuadro, deleteQuadro } from '../../controllers/api/quadro_controller.js';
import { Router } from 'express';

const quadro_router = Router();
quadro_router.post('/', criaQuadro);
quadro_router.get('/', listaQuadros);
quadro_router.put('/', editQuadro);
quadro_router.delete('/', deleteQuadro);

export default quadro_router;