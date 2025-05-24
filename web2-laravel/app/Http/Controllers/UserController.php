<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function formCadastrarUsuario(){
        return view('users.form');
    }

    public function formLogin(){
        return view('users.login');
    }

    public function cadastrarUsuario(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'data_nascimento' => 'required|date:Y-m-d',
                'password' => 'required|string|min:6',
            ]);
            if ($validator->fails()) {
                Log::error('UserController::cadastrarUsuario::validator '.$validator->errors());
                return redirect('/users/cadastrar')->with('errors', 'Verifique os campos e tente novamente.');
            }
            $user = new User();
            $user->create([
                'name' => $request->name,
                'email' => $request->email,
                'data_nascimento' => $request->data_nascimento,
                'password' => bcrypt($request->password),
            ]);
            return redirect('/')->with('success', 'Usuário criado com sucesso!');
        }catch (\Exception $e){
            Log::error('UserController::cadastrarUsuario '.$e->getMessage());
            return redirect('/users/cadastrar')->with('error', 'Erro ao criar usuário.');
        }
    }

    public function login(Request $request){
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);
            if ($validator->fails()) {
                Log::error('UserController::login::validator '.$validator->errors());
                return response()->json(['verifique os dados e tente novamente',401]);
            }
            Auth::attempt($request->only('email', 'password'));
            $request->session()->regenerate();
            return view('filmes.lista');
        }catch (\Exception $e){
            Log::error('UserController::login '.$e->getMessage());
            return redirect('/')->with('error', 'Erro ao acessar o sistema');
        }
    }

    public function logout(){
        try {
            Auth::logout();
            request()->session()->invalidate();
            return redirect('/');
        }catch (\Exception $e){
            Log::error('UserController::logout '.$e->getMessage());
            return redirect('/')->with('error', 'Erro ao acessar o sistema');
        }
    }
}
