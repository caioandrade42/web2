// routers/cachorro_router.js
import { Router } from "express";
import { createCachorro, listCachorros, getCachorro, editCachorro, deleteCachorro } from "../../controllers/api/cachorro_controller.js";

const cachorro_router = Router();

cachorro_router.get('/', listCachorros);
cachorro_router.get('/:id', getCachorro);
cachorro_router.post('/', createCachorro);
cachorro_router.put('/', editCachorro);
cachorro_router.delete('/', deleteCachorro);

export default cachorro_router;