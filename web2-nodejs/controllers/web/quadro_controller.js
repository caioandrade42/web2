import {Quadro, Pesosoa} from '../../modules/quadro_pessoa.js';

async function addQuadro(req,res){
  try {
    await Quadro.create({
      titulo: req.body.titulo,
      ano: req.body.ano,
      valor: req.body.valor,
      pessoaId: req.body.pessoaId
    });
    res.render('alerts', {
      title: 'Quadro adicionado',
      message: 'Quadro adicionado com sucesso!',
      redirect: '/quadros'
    });
  } catch (error) {
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao adicionar quadro!',
      redirect: '/quadros'
    });
    console.error('Error adding quadro:', error);
  }
}

async function listQuadros(req, res) {
  try {
    const quadros = await Quadro.findAll({
      include: Pessoa
    });
    res.render('quadro/list', { quadros});
  } catch (error) {
    console.error('Error listing quadros:', error);
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao listar quadros!',
      redirect: '/'
    });
  }
}

async function editQuadro(req, res) {
  try {
    const quadro = await Quadro.findOne({ where: { id: req.body.id } });
    if (!quadro) {
      return res.render('alerts', {
        title: 'Erro',
        message: 'Quadro não encontrado!',
        redirect: '/quadros'
      });
    }
    quadro.titulo = req.body.titulo;
    quadro.ano = req.body.ano;
    quadro.valor = req.body.valor;
    quadro.pessoaId = req.body.pessoaId;
    if (await quadro.save()) {
      res.render('alerts', {
        title: 'Quadro editado',
        message: 'Quadro editado com sucesso!',
        redirect: '/quadros'
      });
    } else {
      res.render('alerts', {
        title: 'Erro',
        message: 'Erro ao editar quadro!',
        redirect: '/quadros'
      });
    }
  } catch (error) {
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao editar quadro!',
      redirect: '/quadros'
    });
    console.error('Error editing quadro:', error);
  }
}

async function deleteQuadro(req, res) {
  try {
    const quadro = await Quadro.findOne({ where: { id: req.body.id } });
    if (!quadro) {
      return res.render('alerts', {
        title: 'Erro',
        message: 'Quadro não encontrado!',
        redirect: '/quadros'
      });
    }
    await quadro.destroy();
    res.render('alerts', {
      title: 'Quadro excluído',
      message: 'Quadro excluído com sucesso!',
      redirect: '/quadros'
    });
  } catch (error) {
    res.render('alerts', {
      title: 'Erro',
      message: 'Erro ao excluir quadro!',
      redirect: '/quadros'
    });
    console.error('Error deleting quadro:', error);
  }
}

export { addQuadro, listQuadros, editQuadro, deleteQuadro };