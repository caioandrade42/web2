import Cachorro from '../../models/cachorro.js';
import Pessoa from '../../models/pessoa.js';

async function criaCachorro(req, res) {
    const donos = [];
    for (let i = 0; i < req.body.pessoa.length; i++) {
        const dono = await Pessoa.findByPk(req.body.pessoa[i]);
        donos.push(dono);      
    }
    const cachorro = await Cachorro.create({
        nome: req.body.nome,
        raca: req.body.raca,
        idade: req.body.idade
        cor: req.body.cor || null
    });
    await cachorro.addDonos(donos);
    res.render("alerts", {title: "Cachorro cadastrado", message: "Cachorro cadastrado com sucesso!"});
}

async function listaCachorros(req, res) {
    const cachorros = await Cachorro.findAll({include: [Pessoa]});
    res.status(200).json(cachorros);
}

async function editCachorro(req, res) {
    const cachorro = await Cachorro.findOne({
        where: { id: req.body.id }, include: Pessoa});
    cachorro_editing = cachorro.toJSON();
    const donos = await Pessoa.findAll({raw: true});
    cahorro_editing.donos = cachorro_editing.pessoas.map((pessoa)=>{return pessoa.id});
    res.render("cachorro/cachorros",{
        action: "edit",
        cachorro: cachorro_editing,
        pessoas: donos,
    });
}

async function saveCachorro(req, res){
    const donos = [];
    for (let i = 0; i < req.body.pessoa.length; i++) {
        const dono = await Pessoa.findByPk(req.body.pessoa[i]);
        donos.push(dono);      
    }
    const cachorro = await Cachorro.findOne({where: {id: req.body.id}});
    (cachorro.nome = req.body.nome,),
    (cachorro.raca = req.body.raca),
    (cachorro.idade = req.body.idade),
    (cachorro.cor = req.body.cor || null);
    await cachorro.save();
    await cachorro.setDonos(donos);
    res.render("alerts", {title: "Cachorro editado", message: "Cachorro editado com sucesso!"});
}

async function deletaCachorro(req, res) {
    const cachorro = await Cachorro.findOne({where : {id: req.body.id}});    
        
    await cachorro.destroy();
    
    res.status(200).json({ message: 'Cachorro deletado com sucesso' });
}

export {criaCachorro, listaCachorros, saveCachorro, editCachorro, deletaCachorro};