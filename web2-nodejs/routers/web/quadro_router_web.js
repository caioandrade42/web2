import {Router} from 'express';
import {addQuadro, listQuadros, editQuadro, deleteQuadro,buscaQuadroPorId} from '../../controllers/web/quadro_controller.js';

const quadro_router_web = Router();
quadro_router_web.get('/', listQuadros);
quadro_router_web.post('/edit', buscaQuadroPorId);
quadro_router_web.post('/create', addQuadro);
quadro_router_web.post('/save', editQuadro);
quadro_router_web.post('/delete', deleteQuadro);


export default quadro_router_web;