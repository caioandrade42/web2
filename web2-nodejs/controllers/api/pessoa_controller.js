import { Pessoa, Cachorro } from '../../module/pessoa_cachorro.js';
import sequelize from '../../database/mysql.js';

export async function addPessoa(req, res) {
    try {
        const novaPessoa = await Pessoa.create(req.body);
        return res.status(201).json(novaPessoa);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export async function getAllPessoas(req, res) {
    try {
        const pessoas = await Pessoa.findAll({
            include: Cachorro
        });
        return res.status(200).json(pessoas);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export async function getPessoaById(req, res) {
    try {
        const pessoa = await Pessoa.findByPk(req.params.id, {
            include: Cachorro
        });
        if (!pessoa) {
            return res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        return res.status(200).json(pessoa);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


export async function associarCachorro(req, res) {
    const transaction = await sequelize.transaction();
    try {
        const { pessoaId, cachorroId } = req.body;
        const pessoa = await Pessoa.findByPk(pessoaId);
        const cachorro = await Cachorro.findByPk(cachorroId);

        if (!pessoa || !cachorro) {
            return res.status(404).json({ message: 'Pessoa ou Cachorro não encontrado' });
        }

        await sequelize.query(
            'INSERT INTO PessoaCachorro (PessoaId, CachorroId, createdAt,updatedAt) VALUES (?, ?, NOW(), NOW())',
            {
                replacements: [pessoaId, cachorroId],
                transaction
            }
        );
        await transaction.commit();

        const pessoaAtualizada = await Pessoa.findByPk(pessoaId, {
            include: Cachorro
        });
        return res.status(200).json(pessoaAtualizada);
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ error: error.message });
    }
}
