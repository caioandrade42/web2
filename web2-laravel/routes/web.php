<?php

use App\Http\Controllers\FilmeController;
use App\Http\Controllers\LivroController;

use Illuminate\Support\Facades\Route;


Route::get('/', function () {

    return view('index');

});

Route::get('/livros', [LivroController::class, 'exibirLivros']);

Route::get('/livros/criar', [LivroController::class, 'criarLivro']);

Route::post('/livros/criar', [LivroController::class, 'armazenarLivro']);

Route::get('/filmes', [FilmeController::class, 'exibirFilmes']);
Route::get('/filmes/criar', [FilmeController::class, 'criarFilme']);
Route::post('/filmes/criar', [FilmeController::class, 'armazenarFilme']);
Route::post('/filmes/editar', [FilmeController::class, 'editarFilme']);
Route::post('/filmes/atualizar', [FilmeController::class, 'atualizarFilme']);
Route::post('/filmes/excluir', [FilmeController::class, 'excluirFilme']);
