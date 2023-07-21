<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
// Register new user
    public function register(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:App\Models\User,name',
            'password' => 'required|string|min:8|confirmed',
            'email' => 'required|unique:App\Models\User,email',
            'telpon' => 'required|unique:App\Models\User,telpon',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'telpon' => $request->telpon,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('token-name')->plainTextToken;
        $userResource = new \App\Http\Resources\User($user);

        return response()->json([
            'status' => true,
            'pesan' => 'Berhasil Register',
            'data' => $userResource,
            'token' => $token], 201);
    }


// Login user
    public function login(Request $request)
    {
        $credentials = $request->only('name', 'password');
        $user = User::all();
        $userResource = \App\Http\Resources\User::collection($user);

        $responseData = $userResource->toArray(request());

        if (Auth::attempt($credentials)) {
            $user = Auth::guard('api')->user();
            $token = $user->createToken('token-name')->plainTextToken;
            return response()->json([
                'status' => true,
                'pesan' => 'Berhasil Login',
                'data' => $userResource,
                'token' => $token], 201);
        }


        return response()->json([
            'status' => false,
            'pesan' => 'Gagal Login'
        ], 401);
    }

// Forgot password
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 422);
    }

// Reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill(['password' => bcrypt($password)])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 422);
    }
}
