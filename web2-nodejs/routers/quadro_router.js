import express from 'express';
import {
    criarQuadro,
    listarQuadros,
    buscarQuadroPorId,
    atualizarQuadro,
    excluirQuadro,
    buscarQuadrosPorPessoa,
    buscarQuadrosPorFiltro
} from '../controllers/quadro_controller.js';

const quadro_router = express.Router();


quadro_router.post('/quadros', criarQuadro);
quadro_router.get('/quadros', listarQuadros);
quadro_router.get('/quadros/:id', buscarQuadroPorId);
quadro_router.put('/quadros/:id', atualizarQuadro);
quadro_router.delete('/quadros/:id', excluirQuadro);

quadro_router.get('/quadros/pessoa/:pessoaId', buscarQuadrosPorPessoa);
quadro_router.get('/quadros/filtro', buscarQuadrosPorFiltro);

export default quadro_router;