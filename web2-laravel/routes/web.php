<?php

use App\Http\Controllers\LivroController;

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::get('/', function () {

    return view('index');

});

Route::prefix('/livros', )->middleware('auth')->group(function () {
    Route::post('/criar', [LivroController::class, 'armazenarLivro']);
    Route::get('/criar', [LivroController::class, 'criarLivro']);
    Route::get('/', [LivroController::class, 'exibirLivros']);
});

Route::prefix('/users')->group(function () {
    route::post('/cadastrar', [UserController::class, 'cadastrarUser']);
    route::post('/login', [UserController::class, 'login']);
    route::get('/logout', [UserController::class, 'logout'])->middleware('auth');
});
