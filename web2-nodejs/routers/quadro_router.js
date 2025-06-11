import express from 'express';
import {
    criarQuadro,
    listarQuadros,
    buscarQuadroPorId,
    atualizarQuadro,
    excluirQuadro,
    associarQuadroPessoa
} from '../controllers/quadro_controller.js';

const quadro_router = express.Router();


quadro_router.post('/', criarQuadro);
quadro_router.get('/', listarQuadros);
quadro_router.get('/:id', buscarQuadroPorId);
quadro_router.put('/atualizar/:id', atualizarQuadro);
quadro_router.delete('/:id', excluirQuadro);
quadro_router.put('/associar' , associarQuadroPessoa)

export default quadro_router;