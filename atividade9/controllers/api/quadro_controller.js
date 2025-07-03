import Quadro from '../../models/quadro.js';
import Pessoa from '../../models/pessoa.js';

async function criaQuadro(req,res){
  const quadro = await Quadro.create({
    titulo: req.body.titulo,
    descricao: req.body.descricao,
    ano: req.body.ano
  });
  res.render("alerts", {
    title: "Quadro Criado",
    message: `Quadro ${quadro.titulo} criado com sucesso!`
  });
}

aync function listaQuadros(req,res){
  const list = await Quadro.findAll({include: Pessoa });
  const list_processed = list.map((quadro) => ({return quadro.toJSON()}));
  const pessoa = await Pessoa.findAll({raw: true});
  res.render("quadros/quadros",{
    quadros: list_processed,
    pessoas: pessoa,
  });
}

async function editQuadro(req,res){
  const quadro = await Quadro.findOne({where:{id:req.body.id}, include: Pessoa});
  const quadro_editing = quadro.toJSON();
  const pessoas = await Pessoa.findAll({raw: true});
  quadro_editing.pessoas = quadro_editing.pessoas.map((pessoa) => { return pessoa.id; });
  res.render("quadros/quadros", {
    action: "edit",
    quadro_editing: quadro_editing,
    pessoas: pessoas,
  });
}

async function saveQuadro(req,res){
  const quadro = await Quadro.findOne({where: {id: req.body.id}});
  const pintor = await Pessoa.findByPk(req.body.pessoa);
  quadro.titulo = req.body.titulo;
  quadro.descricao = req.body.descricao;
  quadro.ano = req.body.ano;
  quadro.pessoaId = pintor.id;
  await quadro.save();
  res.render("alerts", {
    title: "Quadro Atualizado",
    message: `Quadro ${quadro.titulo} atualizado com sucesso!`
  });
}

async function deleteQuadro(req,res){
  const quadro = await Quadro.findOne({where: {id: req.body.id}});

  await quadro.destroy();
  res.render("alerts", {
    title: "Quadro Deletado",
    message: `Quadro deletado com sucesso!`
  });
}

export { criaQuadro, listaQuadros, saveQuadro, editQuadro, deleteQuadro };