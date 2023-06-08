<?php

namespace App\Http\Controllers;

use App\Http\Requests\CadastroRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function cadastrar(CadastroRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response([
           'user' => $user,
           'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credencials = $request->validated();
        $remember = $credencials['remember'] ?? false;
        unset($credencials['remember']);

        if (!Auth::attempt($credencials, $remember)) {
            return response([
                'errors' => ['invalido' => ['Dados inválidos']]
            ], 422);
        }
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        return response([
            'user' => $user
        ]);
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function returnUser(Request $request)
    {
        return $request->user();
    }
}
