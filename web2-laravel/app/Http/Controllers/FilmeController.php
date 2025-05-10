<?php

namespace App\Http\Controllers;

use App\Models\Filme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class FilmeController extends Controller
{
    public function exibirFilmes()
    {
        $filmes = Filme::all();
        return view('filmes.lista' , compact('filmes'));
    }

    public function criarFilme()
    {
        return view('filmes.form');
    }

    public function armazenarFilme(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'titulo' => 'required|string|max:255',
                'genero' => 'required|string|max:255',
                'sinopse' => 'required|string|max:1000',
                'duracao' => 'required|date_format:H:i',
                'ano_lancamento' => 'required|date'
            ]);
            if ($validator->fails()) {
                Log::error('FilmeControllerClass::armazenarFilme'.$validator->errors());
                return redirect('/filmes/criar')->with('errors', 'Verifique os campos e tente novamente.');
            }
            Filme::create($request->all());

            return redirect('/filmes')->with('success', 'Filme criado com sucesso!');
        }catch (\Exception $e){
            Log::error('FilmeControllerClass::armazenarFilme'.$e->getMessage());
            return redirect('/filmes/criar')->with('error', 'Erro ao criar filme.');
        }
    }

    public function editarFilme(Request $request)
    {
        try {
            $filme = Filme::find($request->id);
            if (!$filme) {
                return redirect('/filmes')->with('error', 'Filme não encontrado.');
            }
            $filme->update($request->all());
            return view('filmes.form', ['livro'=>$filme]);
        }catch (\Exception $e){
            Log::error('FilmeControllerClass::editarFilme'.$e->getMessage());
            return redirect('/filmes')->with('error', 'Erro ao editar filme.');
        }
    }

    public function atualizarFilme(Request $request){
        try {
            $filme = Filme::find($request->id);
            if (!$filme) {
                return redirect('/filmes')->with('error', 'Filme não encontrado.');
            }
            $filme->update($request->all());
            return redirect('/filmes')->with('success', 'Filme atualizado com sucesso!');
        }catch (\Exception $e){
            Log::error('FilmeControllerClass::atualizarFilme'.$e->getMessage());
            return redirect('/filmes')->with('error', 'Erro ao atualizar filme.');
        }
    }

    public function excluirFilme(Request $request)
    {
        try {
            $filme = Filme::find($request->id);
            if (!$filme) {
                return redirect('/filmes')->with('error', 'Filme não encontrado.');
            }
            $filme->delete();
            return redirect('/filmes')->with('success', 'Filme excluído com sucesso!');
        }catch (\Exception $e){
            Log::error('FilmeControllerClass::excluirFilme'.$e->getMessage());
            return redirect('/filmes')->with('error', 'Erro ao excluir filme.');
        }
    }

}
