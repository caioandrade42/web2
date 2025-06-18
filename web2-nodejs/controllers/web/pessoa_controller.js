import {Pessoa, Cachorro, PessoaCachorro} from '../../module/pessoa_cachorro.js';
import { criaRelacao, verificaRelacao} from './pessoa_cachorro_controller.js';


async function addPessoa(req, res) {
  try{
    console.log('tentando criar pessoa: ' + req.body.nome);
    const pessoa = await Pessoa.create({
    nome: req.body.nome,
    idade: req.body.idade,
    cpf: req.body.cpf,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    createdAt: new Date(),
    updatedAt: null
  });
    if (req.body.cachorroId) {
      const cachorroId = req.body.cachorroId;
      const pessoaCachorro = verificaRelacao(pessoa.id, cachorroId);
      if (!pessoaCachorro) {
        await PessoaCachorro.create({
          PessoaId: pessoa.id,
          CachorroId: cachorroId
        });
      } else {
        console.log('Pessoa já associada a um cachorro, não será criada nova relação.');    
    }
    res.render('alerts', {
      title: 'Cadastro de Pessoa',
      message: 'Pessoa cadastrada com sucesso!',
      redirect: '/pessoa/pessoa'})
    }
  }catch (error) {
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao cadastrar pessoa!',
      redirect: '/pessoa/pessoa'
    });
    console.error('Error creating person:', error);
  }
}

async function listPessoas(req, res) {
  try {
    const pessoas = await Pessoa.findAll({ raw: true });
    res.render('pessoa/pessoa', { pessoas });
  } catch (error) {
    console.error('Error listing people:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao listar pessoas!',
      redirect: '/pessoa/pessoa'
    });
  }
}

async function buscaPessoaPorId(req, res) {
  try {
    const pessoa = await Pessoa.findByPk(req.params.id, {
      include: Cachorro
    });
    if (!pessoa) {
      return res.render('alerts', {
        title: 'Erro',
        message: 'Pessoa não encontrada!',
        redirect: '/pessoas'
      });
    }
    res.render('pessoa/edit', { pessoa });
  } catch (error) {
    console.error('Error fetching person by ID:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao buscar pessoa!',
      redirect: '/pessoas'
    });
  }
}

async function editPessoa(req, res) {
  try {
    const pessoa = await Pessoa.findOne({ where: { id: req.body.id } });
    
    if (!pessoa) {
      return res.render('alerts', {
        title: 'Erro',
        message: 'Pessoa não encontrada!',
        redirect: '/pessoas'
      });
    }
    if (req.body.cachorroId) {
      const pessoaCachorro = verificaRelacao(pessoa.id, req.body.cachorroId);
      if (!pessoaCachorro) {
        await criaRelacao(pessoa.id, req.body.cachorroId);
      }else{
        console.log('Pessoa já associada a este cachorro, não será criada nova relação.');
      }      
    }
    pessoa.nome = req.body.nome;
    pessoa.idade = req.body.idade;
    pessoa.cpf = req.body.cpf;
    pessoa.endereco = req.body.endereco;
    pessoa.telefone = req.body.telefone;

    if (await pessoa.save()) {
      res.render('alerts', {
        title: 'Sucesso',
        message: 'Registro alterado com sucesso!',
        redirect: '/pessoas'
      });
    } else {
      console.error('Failed to save person update for ID:', pessoa.id);
      res.render('alerts', {
        title: 'Erro',
        message: 'Erro ao alterar registro!',
        redirect: '/pessoas'
      });
    }
  } catch (error) {
    console.error('Error editing person:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao editar pessoa!',
      redirect: '/pessoas'
    });
  }
}

async function deletePessoa(req, res) {
  try{
    const pessoa = await Pessoa.findOne({ where: { id: req.body.id } });
  if (!pessoa) {
    return res.render('alerts', {
      title: 'Erro',
      message: 'Pessoa não encontrada!',
      redirect: '/pessoas'
    });
  }
  const pessoaCachorro = await PessoaCachorro.findOne({ where: { PessoaId: pessoa.id } });
  if (pessoaCachorro) {
    await PessoaCachorro.destroy({where: { PessoaId: pessoa.id } });
  }
  await pessoa.destroy();
  res.render('alerts', {
    title: 'Sucesso',
    message: 'Pessoa excluída com sucesso!',
    redirect: '/pessoas'
  });
  }catch(error){
    console.error('Error deleting person:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao excluir pessoa!',
      redirect: '/pessoas'
    });
  }
}

export { addPessoa, listPessoas, editPessoa, deletePessoa, buscaPessoaPorId };