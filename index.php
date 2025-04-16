<?php

require_once './vendor/autoload.php';
use App\controle\ControleCliente;

$router = new Bramus\Router\Router();

$router->get('/', function() {
  echo 'Hello World';
} );

$router->get('/clientes', function() {
  $cc = new ControleCliente();
  $cc->listar();
} );

$router->run();

$cc = new ControleCliente();
$cc->listar();

$router->setNamespace('App\controle');
$router->get('/clientes/novo', function() {
  $cc = new ControleCliente();
  $cc->novo();
} );