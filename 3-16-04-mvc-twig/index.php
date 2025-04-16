<?php
require_once __DIR__ . '/vendor/autoload.php';

use Bramus\Router\Router;

$router = new Router();

$router->get('/about', function() {
    echo 'About Page Contents';
});
$router->setNamespace('App\Controle');
$router->get('/clientes/listar', 'ControleCliente@listar');
$router->get('/clientes/digitar', 'ControleCliente@digitar');
$router->post('/clientes/cadastrar', 'ControleCliente@cadastrar');

$router->run();