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
        print_r($cliente->listar());
        echo '</pre>';
    }

    public function excluir($idcliente)
    {
        $cliente = new Cliente();
        $resultado = $cliente->delete($idcliente);
        if ($resultado['status'] == 200) {
            echo "Cliente excluído com sucesso!";
        } else {
            echo "Erro ao excluir cliente: " . $resultado['msg'];
        }
    }

    public function alterarCliente($idcliente,$nome)
    {
        $cliente = new Cliente();
        $resultado = $cliente->update($idcliente, $nome);
        if ($resultado['status'] == 200) {
            echo "Cliente atualizado com sucesso!";
        } else {
            echo "Erro ao atualizar cliente: " . $resultado['msg'];
        }
    }

}
