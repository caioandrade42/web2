import {Pessoa Cachorro PessoaCachorro} from '../../module/pessoa_cachorro.js';
import { criaRelacao, verificaRelacao } from './pessoa_cachorro_controller.js';


async function addCachorro(req, res) {
  try{
    const cachorro = await Cachorro.create({
    nome: req.body.nome,
    idade: req.body.raca,
    idade: req.body.idade,
    peso: req.body.peso,
    cor: req.body.cor
  });
  if (req.body.pessoaId) {
    const pessoacachorro = verificaRelacao(pessoa.id, cachorro.id);
    if (!pessoacachorro) {
      await criaRelacao(pessoa.id, cachorro.id);
    } else {
      console.log('Pessoa já associada a um cachorro, não será criada nova relação.');
    }
  }
  res.render('alerts', {
    title: 'Cadastro de Cachorro',
    message: 'Cachorro cadastrado com sucesso!',
    redirect: '/cachorros'})
  }catch (error) {
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao cadastrar Cachorro!',
      redirect: '/'
    });
    console.error('Error creating person:', error);
  }
}

async function listCachorros(req, res) {
  try {
    const cachorros = await Cachorro.findAll({
      include: PessoaCachorro
    });
    res.render('cachorro/list', { cachorros });
  } catch (error) {
    console.error('Error listing dogs:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao listar cachorros!',
      redirect: '/'
    });
  }
}

async function editCachorro(req, res) {
  try {
    const cachorro = await Cachorro.findOne({ where: { id: req.body.id } });
    if (!cachorro) {
      return res.render('alerts', {
        title: 'Erro',
        message: 'Cachorro não encontrado!',
        redirect: '/cachorros'
      });
    }
    if (req.body.pessoaId) {
      const pessoaCachorro = await verificaRelacao(cachorro.id, req.body.pessoaId);
      if (!pessoaCachorro) {
        await criaRelacao(cachorro.id, req.body.pessoaId);
      } else {
        console.log('Cachorro já associado a esta pessoa, não será criada nova relação.');
      }
    }
    cachorro.nome = req.body.nome;
    cachorro.raca = req.body.raca;
    cachorro.idade = req.body.idade;
    cachorro.peso = req.body.peso;
    cachorro.cor = req.body.cor;

    if (await cachorro.save()) {
      res.render('alerts', {
        title: 'Sucesso',
        message: 'Registro alterado com sucesso!',
        redirect: '/cachorros'
      });
    } else {
      res.render('alerts', {
        title: 'Erro',
        message: 'Erro ao alterar registro!',
        redirect: '/cachorros'
      });
    }
  } catch (error) {
    console.error('Error editing dog:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao editar cachorro!',
      redirect: '/'
    });
  }
}

async function deleteCachorro(req, res) {
  try {
    const cachorro = await Cachorro.findOne({ where: { id: req.body.id } });
    if (!cachorro) {
      return res.render('alerts', {
        title: 'Erro',
        message: 'Cachorro não encontrado!',
        redirect: '/cachorros'
      });
    }
    const pessoaCachorro = await PessoaCachorro.findOne({ where: { cachorroId: cachorro.id } });
    if (pessoaCachorro) {
      await PessoaCachorro.destroy({where: { cachorroId: cachorro.id } });
    }
    await cachorro.destroy();
    res.render('alerts', {
      title: 'Sucesso',
      message: 'Cachorro deletado com sucesso!',
      redirect: '/cachorros'
    });
  } catch (error) {
    console.error('Error deleting dog:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao deletar cachorro!',
      redirect: '/'
    });
  }
}
export { addCachorro, listCachorros, editCachorro, deleteCachorro };