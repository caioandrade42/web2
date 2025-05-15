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
                'nome' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'data_nascimento' => 'required|date:Y-m-d',
                'password' => 'required|string|min:8|confirmed',
            ]);
            if ($validator->fails()) {
                Log::error('UserController::cadastrarUsuario::validator '.$validator->errors());
                return redirect('/users/cadastrar')->with('errors', 'Verifique os campos e tente novamente.');
            }
            $user = new User();
            $user->create([
                'name' => $request->nome,
                'email' => $request->email,
                'data_nascimento' => $request->data_nascimento,
                'password' => bcrypt($request->password),
            ]);
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
            return response()->json(['usuario logado com sucesso',200]);
        }catch (\Exception $e){
            Log::error('UserController::login '.$e->getMessage());
            return response()->json(['erro ao acessar o sistema',401]);
        }
    }

    public function logout(){
        try {
            Auth::logout();
            request()->session()->invalidate();
            return redirect('/');
        }catch (\Exception $e){
            Log::error('UserController::logout '.$e->getMessage());
            return response()->json(['erro ao acessar o sistema',401]);
        }
    }
}
