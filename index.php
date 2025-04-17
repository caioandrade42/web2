<?php

require_once __DIR__ . './vendor/autoload.php';

use Bramus\Router\Router;
use App\controle\ControleCliente;

header('Content-type: application/json; charset=utf-8');

$router = new Router();
$clienteController = new ControleCliente();

$router->get('/clientes', fn () => $clienteController->listar());
$router->post('/clientes/cadastrar', fn () => $clienteController->cadastrar());
$router->delete('/clientes/excluir', fn () => $clienteController->excluir(1));
$router->put('/clientes/alterar', fn () => $clienteController->alterarCliente(2, 'Novo Nome'));