<?php

use App\Http\Controllers\LivroController;

use Illuminate\Support\Facades\Route;


Route::get('/', function () {

    return view('index');

});

Route::get('/livros', [LivroController::class, 'exibirLivros']);

Route::get('/livros/criar', [LivroController::class, 'criarLivro']);

Route::post('/livros/criar', [LivroController::class, 'armazenarLivro']);
