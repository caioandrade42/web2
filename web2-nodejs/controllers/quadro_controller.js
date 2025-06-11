import {Quadro, Pessoa} from '../module/quadro_pessoa.js';
import sequelize from '../database/mysql.js';
import { Op } from 'sequelize';

export async function criarQuadro(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { titulo,  ano, valor } = req.body;

        if (!titulo || !ano || valor === undefined) {
            return res.status(400).json({ message: 'Título, ano e valor são obrigatórios' });
        }

        const quadro = await Quadro.create({
            titulo,
            ano,
            valor
        }, { transaction });

        await transaction.commit();
        return res.status(201).json(quadro);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}

export async function listarQuadros(req, res) {
    try {
        const quadros = await Quadro.findAll({include: {
            model: Pessoa,
            as: 'pintor',
            attributes: ['id', 'nome']
            }});
        return res.status(200).json(quadros);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function buscarQuadroPorId(req, res) {
    try {
        const { id } = req.params;
        const quadro = await Quadro.findByPk(id);

        if (!quadro) {
            return res.status(404).json({ message: 'Quadro não encontrado' });
        }

        return res.status(200).json(quadro);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export async function atualizarQuadro(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const { titulo, pessoaId, ano, valor } = req.body;

        const quadro = await Quadro.findByPk(id);

        if (!quadro) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Quadro não encontrado' });
        }

        await quadro.update({
            titulo: titulo || quadro.titulo,
            pessoaId: pessoaId !== undefined ? pessoaId : quadro.pessoaId,
            ano: ano || quadro.ano,
            valor: valor !== undefined ? valor : quadro.valor
        }, { transaction });

        await transaction.commit();
        return res.status(200).json(quadro);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}

export async function excluirQuadro(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { id } = req.params;
        const quadro = await Quadro.findByPk(id);

        if (!quadro) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Quadro não encontrado' });
        }

        await quadro.destroy({ transaction });

        await transaction.commit();
        return res.status(200).json({ message: 'Quadro excluído com sucesso' });
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}

export async function associarQuadroPessoa(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const body = req.body;
        const { quadroId, pessoaId } = req.body;

        if (!quadroId || !pessoaId) {
            return res.status(400).json({ message: 'ID do quadro e ID da pessoa são obrigatórios' });
        }

        const quadro = await Quadro.findByPk(quadroId);
        if (!quadro) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Quadro não encontrado' });
        }

        await quadro.update({ pessoaId }, { transaction });

        await transaction.commit();
        return res.status(200).json(quadro);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}
