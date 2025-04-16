<?php
namespace App\Controle;

use App\Modelo\Cliente;
use App\Visao\VisaoCliente;

class ControleCliente
{

    public function digitar()
    {
        $vC = new VisaoCliente();
        $vC->mostrarForm();
    }
    public function cadastrar()
    {
        $nome = filter_input(INPUT_POST, 'nome');
        $cliente = new Cliente($nome);
        $vC = new VisaoCliente();
        $msg = '';
        if($cliente->save()) {
            $msg = 'Cliente cadastrado com sucesso!';
        } else {
            $msg = 'Erro ao cadastrar cliente!';
        }
        $vC->exibirMensagem($msg);
    }
    public function listar()
    {
        $vC = new VisaoCliente();
        $vC->exibir(Cliente::list());
    }
}
