<?php

use App\Http\Controllers\LivroController;
use App\Http\Controllers\FilmeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {

    return view('index');

});

Route::prefix('/livros', )->group(function () {
    Route::post('/criar', [LivroController::class, 'armazenarLivro']);
    Route::get('/criar', [LivroController::class, 'criarLivro']);
    Route::get('/', [LivroController::class, 'exibirLivros']);
});

route::post('/login', [UserController::class, 'login']);
route::get('/login', [UserController::class, 'formLogin']);
Route::prefix('/users')->group(function () {
    route::post('/cadastrar', [UserController::class, 'cadastrarUsuario']);
    route::get('/cadastrar', [UserController::class, 'formCadastrarUsuario']);
    route::get('/logout', [UserController::class, 'logout'])->middleware('auth');
});

Route::prefix('/filmes')->middleware('auth')->group(function () {
    Route::get('/filmes', [FilmeController::class, 'exibirFilmes']);
    Route::get('/criar', [FilmeController::class, 'criarFilme']);
    Route::post('/criar', [FilmeController::class, 'armazenarFilme']);
    Route::post('/editar', [FilmeController::class, 'editarFilme']);
    Route::post('/atualizar', [FilmeController::class, 'atualizarFilme']);
    Route::post('/excluir', [FilmeController::class, 'excluirFilme']);
});
