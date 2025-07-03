import Cachorro from '../../models/cachorro.js';
import Pessoa from '../../models/pessoa.js';
import Quadro from '../../models/quadro.js';

async function criaPessoa(req, res) {
    const cachorros = [];
    for (let i = 0; i < req.body.cachorro.length; i++) {
        const cachorro = await Cachorro.findByPk(req.body.cachorro[i]);
        cachorros.push(cachorro);
    }
    const pessoa = await Pessoa.create({
        nome: req.body.nome,
        idade: req.body.idade,
        email: req.body.email || null
        dataNascimento: req.body.dataNascimento || null
    });
    await pessoa.addCachorros(cachorros);
    res.render("alerts", {title: "Pessoa criada", message: "Pessoa criada com sucesso!"});
}

async function listaPessoas(req, res) {
    const list = await Pessoa.findAll({
        include: [Cachorro, Quadro]});
    const list_processed = list.map((pessoa)=>{
        return pessoa.toJSON();
    })
    const cachorros = await Cachorro.findAll();
    const quadros = await Quadro.findAll();
    res.render("pessoas/pessoas",{
        pessoas : list_processed,
        cachorros: cachorros,
        quadros: quadros
    });
}

async function editPessoa(req, res) {
    const pessoa = await Pessoa.findOne({ where: { id: req.body.id }, include: [Cachorro, Quadro] });
    const pessoa_editing = pessoa.toJSON();
    const cachorros = await Cachorro.findAll({raw: true});
    const quadros = await Quadro.findAll({raw: true});
    pessoa_editing.cachorros = pessoa_editing.cachorros.map((c) => {return c.id});
    pessoa_editing.quadros = pessoa_editing.quadros.map((q) => {return q.id});
    res.render("pessoas/pessoas", {
        action : "edit",
        pessoa_editing: pessoa_editing,
        cachorros: cachorros,
        quadros: quadros
    });
}   

async function savePessoa(req, res){
    const cachorros = [];
    for (let i = 0; i < req.body.cachorro.length; i++) {
        const cachorro = await Cachorro.findByPk(req.body.cachorro[i]);
        cachorros.push(cachorro);
    }
    const pessoa = await Pessoa.findOne({ where: { id: req.body.id } });
    pessoa.nome = req.body.nome;
    pessoa.idade = req.body.idade;
    pessoa.email = req.body.email || null;
    pessoa.dataNascimento = req.body.dataNascimento || null;
    await pessoa.save();
    await pessoa.setCachorros(cachorros);
    res.render("alerts", {title: "Pessoa editada", message: "Pessoa editada com sucesso!"});
}

async function deletePessoa(req, res) {
    const pessoa = await Pessoa.findOne({ where: { id: req.body.id } });
    await pessoa.destroy();
    res.status(200).json({ message: 'Pessoa deletada com sucesso' });
}

export { criaPessoa, listaPessoas, savePessoa, editPessoa, deletePessoa };