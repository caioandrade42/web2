<?php

namespace App\controle;
use App\modelo\Cliente;
class ControleCliente
{

    public function cadastrar()
    {
        $nome = 'Teste da Silva';
        $cliente = new Cliente($nome);
        $cliente->save($nome);
        echo "Cliente cadastrado com sucesso: " . $cliente->getNome() . "<br>";
    }
    public function listar()
    {
        $cliente = new Cliente();
        echo '<pre>';
        print_r($cliente->list());
        echo '</pre>';
    }
}
