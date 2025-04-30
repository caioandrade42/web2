<?php

namespace App\Http\Controllers;



use Illuminate\Http\Request;

use App\Models\Livro;



class LivroController extends Controller

{

    public function exibirLivros()

    {

        $livros = Livro::all();

        return view('livros.lista', compact('livros'));

    }

    public function criarLivro()

    {

        return view('livros.form');

    }

    public function armazenarLivro(Request $request)

    {

        Livro::create(

            [

                'titulo' => $request->input('titulo'),

                'autor' => $request->input('autor'),

                'ano_publicacao' => $request->input('ano_publicacao'),

                'descricao' => $request->input('descricao')

            ]

        );

        return redirect('/livros')->with('success', 'Livro criado com sucesso!');

    }

}
