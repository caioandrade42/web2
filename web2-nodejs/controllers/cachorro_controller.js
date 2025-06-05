import Cachorro from "../module/cachorro.js";

async function createCachorro(req, res) {
    try {
        const cachorro = await Cachorro.create({
            nome: req.body.nome,
            raca: req.body.raca,
            idade: req.body.idade,
            peso: req.body.peso,
            cor: req.body.cor
        });
        res.json(cachorro);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao cadastrar cachorro' , error });
    }
}

async function listCachorros(req, res) {
    try {
        const list = await Cachorro.findAll();
        res.json(list);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao listar cachorros' , error });
    }
}

async function getCachorro(req, res) {
    try {
        const cachorro = await Cachorro.findOne({ where: { id: req.params.id } });
        if (cachorro) {
            res.json(cachorro);
        } else {
            res.status(404).json({ mensagem: 'Cachorro não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao buscar cachorro' , error });
    }
}

async function editCachorro(req, res) {
    try {
        const cachorro = await Cachorro.findOne({ where: { id: req.body.id } });
        if (!cachorro) {
            return res.status(404).json({ mensagem: 'Cachorro não encontrado' });
        }

        cachorro.nome = req.body.nome;
        cachorro.raca = req.body.raca;
        cachorro.idade = req.body.idade;
        cachorro.peso = req.body.peso;
        cachorro.cor = req.body.cor;

        if (await cachorro.save()) {
            res.json({ mensagem: 'Registro alterado com sucesso' });
        } else {
            res.json({ mensagem: 'Erro ao alterar' });
        }
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao editar cachorro' , error });
    }
}

async function deleteCachorro(req, res) {
    try {
        const cachorro = await Cachorro.findOne({ where: { id: req.body.id } });
        if (!cachorro) {
            return res.status(404).json({ mensagem: 'Cachorro não encontrado' });
        }

        await cachorro.destroy();
        res.json({ mensagem: 'Deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao deletar cachorro' , error });
    }
}

export { createCachorro, listCachorros, getCachorro, editCachorro, deleteCachorro };