<?php

namespace App\Http\Controllers;


use App\Models\Livro;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


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

    public function editarLivro(Request $request)
    {

        try {
            $id = $request->input('id');
            $titulo = $request->input('titulo');
            $autor = $request->input('autor');
            $ano_publicacao = $request->input('ano_publicacao');
            $descricao = $request->input('descricao');

            $livro = new Livro();

            $livroEditado = $livro->where('id', $id)->get()->first();
            $livroEditado->titulo = $titulo;
            $livroEditado->autor = $autor;
            $livroEditado->ano_publicacao = $ano_publicacao;
            $livroEditado->descricao = $descricao;
            $livroEditado->update();
            return redirect('/livros')->with('success', 'Livro editado com sucesso!');
        } catch (Exception $e) {
            Log::error('LivroController::editarLivro ' . $e->getMessage());
            return redirect('/livros')->with('error', 'Erro ao editar livro!');
        }
    }

    public function excluirLivro(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), ['id' => 'required|numeric'])->validate();
            if (\validator()->fails()) {
                return redirect('/livros')->withErrors($validator);
            }
            $id = $request->input('id');
            $livro = new livro();
            livro::destroy($id);
            return redirect('/livros')->with('success', 'Livro excluido com sucesso!');

        } catch (Exception $e) {
            Log::debug('LivroController->excluirLivro: ' . $e->getMessage());
            return redirect('/livros')->with('error', 'Erro ao excluir livro!');
        }
    }

    public funtion atualizarLivro(Request $request){
        try{

        }
    }

}
