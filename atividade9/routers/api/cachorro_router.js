import {criaCachorro, listaCachorros, editCachorro, deletaCachorro} from '../../controllers/api/cachorro_controller.js';
import { Router } from 'express';

const cachorro_router = Router();
cachorro_router.post('/', criaCachorro);
cachorro_router.get('/', listaCachorros);
cachorro_router.put('/', editCachorro);
cachorro_router.delete('/', deletaCachorro);

export default cachorro_router;