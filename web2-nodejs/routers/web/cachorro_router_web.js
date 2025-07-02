import { Router } from 'express';
import { addCachorro, listCachorros, editCachorro, deleteCachorro, buscaCachorroPorId } from '../../controllers/web/cachorro_controller.js';

const cachorro_router_web = Router();
cachorro_router_web.get('/', listCachorros);
cachorro_router_web.post('/edit' , buscaCachorroPorId);
cachorro_router_web.post('/create', addCachorro);
cachorro_router_web.post('/save', editCachorro);
cachorro_router_web.post('/delete', deleteCachorro);

export default cachorro_router_web;