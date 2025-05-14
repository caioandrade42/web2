<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function cadastrarUser(Request $request){

    }

    public function login(Request $request){
        try {
            $validor = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);
            if ($validor->fails()) {
                Log::error('UserController::login::validator '.$validor->errors());
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

    public function logout(Request $request){
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
