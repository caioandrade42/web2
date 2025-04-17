<?php

namespace App\modelo;
use App\modelo\Conexao;

class Cliente {
    private $nome;
    private $table = "cliente";

    public function __construct($nome = null) {
        $this->nome = $nome;
    }

    public function getNome() {
        return $this->nome;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function save($nome) {
        $conexao = new Conexao();
        $sql = "insert into {$this->table} (nome) values (:nome)";
        $prepara = $conexao->preparaComando($sql);
        $prepara->bindParam(':nome', $nome);
        if ($prepara->execute()) {
            return ['status' => true, 'mensagem' => 'Cliente cadastrado com sucesso!'];
        } else {
            return ['status' => false, 'mensagem' => 'Erro ao cadastrar cliente!', 'erro' => $prepara->errorInfo()];
        }
    }

    public function listar() {
        $conexao = new Conexao();
        $sql = "select * from {$this->table} order by id desc";
        $prepara = $conexao->preparaComando($sql);
        if ($prepara->execute()) {
            $resultado = $prepara->fetchAll(\PDO::FETCH_ASSOC);
            return ['status' => true, 'dados' => $resultado];
        }else {
            return ['status' => false, 'mensagem' => 'Erro ao listar clientes!'];
        }
    }

   public function delete($idcliente) {
       $conexao = new Conexao();
       $sql = "delete from {$this->table} where id = :idcliente";
       $prepara = $conexao->preparaComando($sql);
       $prepara->bindParam(':idcliente', $idcliente);
       if ($prepara->execute()) {
           return ["status" => 200, "msg" => "Usuário apagado com sucesso"];
       } else {
           return ["status" => 500, "msg" => "Erro ao apagar usuário"];
       }
   }

    public function update($idcliente, $nome) {
        $conexao = new Conexao();
        $sql = "update {$this->table} set nome = :nome where id = :idcliente";
        $prepara = $conexao->preparaComando($sql);
        $prepara->bindParam(':nome', $nome);
        $prepara->bindParam(':idcliente', $idcliente);
        if ($prepara->execute()) {
            return ["status" => 200, "msg" => "usuario atualizado com sucesso"];
        } else {
            return ["status" => 500, "msg" => "Erro ao atualizar usuario"];
        }
    }
}