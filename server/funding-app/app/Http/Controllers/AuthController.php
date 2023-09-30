<?php

namespace App\Http\Controllers;

use App\Models\EventParticipant;
use App\Rules\EmailOrPhone;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    use ResponseTrait;

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|regex:/^[a-zA-Z ]+$/',
            'password' => 'required|string|min:8|confirmed',
            'contact' => ['required', new EmailOrPhone('users', 'email', 'telphone')],
            'gender' => 'required|string|in:male,female'
        ]);

        try {
            Log::info('Starting user registration process.');
            $profile_image = '';
            if ($request->gender === 'male') {
                $profile_image = 'https://res.cloudinary.com/accuworks/image/upload/v1692896315/funding-app/User/default/default_pria_v2.jpg';
            } else {
                $profile_image = 'https://res.cloudinary.com/accuworks/image/upload/v1692896315/funding-app/User/default/default_wanita_v2.jpg';
            }

            if (filter_var($request->contact, FILTER_VALIDATE_EMAIL)) {
                $user = User::create([
                    'name' => $request->name,
                    'password' => $request->password,
                    'email' => $request->contact,
                    'gender' => $request->gender,
                    'profile_image' => $profile_image
                ]);
            } else {
                $user = User::create([
                    'name' => $request->name,
                    'password' => $request->password,
                    'telphone' => $request->contact,
                    'gender' => $request->gender,
                    'profile_image' => $profile_image
                ]);
            }

            Log::info('User created successfully.', ['user' => $user]);
            return $this->successResponse(201, true, 'Berhasil Register', ['user' => $user]);

        } catch (ValidationException $e) {
            Log::error('Validation failed.', ['errors' => $e->errors()]);
            return $this->errorResponse(422, 'data yang diberikan tidak valid', $e->errors());
        } catch (\Exception $e) {
            Log::error('An error occurred during registration.', ['exception' => $e->getMessage()]);
            return $this->errorResponse(500, 'Terjadi kesalahan saat registrasi', []);
        }
    }


    public function login(Request $request)
    {
        try {
            $request->validate([
                'contact' => 'required',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->contact)
                ->orWhere('telphone', $request->contact)
                ->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                Log::info('Login failed for user: ' . $request->contact);
                throw ValidationException::withMessages([
                    'contact or password' => ['Kredensial yang diberikan salah.'],
                ]);
            }

            $token = $user->createToken('sanctum_token')->plainTextToken;

            Log::info('Login successful for user: ' . $user->id);

            return $this->successResponse(200, true, 'Login berhasil', ['token' => $token])
                ->header('Authorization', 'Bearer ' . $token);
        } catch (ValidationException $e) {
            Log::error('Validation error: ', $e->errors());
            return $this->errorResponse(422, 'data yang diberikan tidak valid', $e->errors());
        } catch (\Exception $e) {
            Log::error('Exception error: ' . $e->getMessage());
            return $this->errorResponse(500, 'Terjadi kesalahan saat login', null);
        }
    }


    public function tokenTest(Request $request)
    {
        $userData = $request->user()->load('contacts');

        $userEvents = EventParticipant::where('id_user', $request->user()->id)
            ->with([
                'event' => function ($query) {
                    $query->with(['event_media', 'event_participant','event_participant.user', 'user:id,name,profile_image']);
                }
            ])
            ->get()
            ->pluck('event');

        return $this->successResponse(200, true, 'User data', [
            'user' => $userData,
            'UserEvents' => $userEvents,
        ]);
    }



    public function changePassword(Request $request)
    {
        $request->validate([
            'old_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8|confirmed|different:old_password'
        ]);

        try {
            $user = $request->user();
            if (!Hash::check($request->old_password, $user->password)) {
                return $this->errorResponse(401, 'Invalid credentials', []);
            }
            $user->password = $request->new_password;
            $user->save();

            return $this->successResponse(200, true, 'Password berhasil diubah', []);
        } catch (\Exception $e) {
            return $this->errorResponse(500, 'Terjadi kesalahan saat mengubah password', []);
        }
    }




    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return $this->successResponse(200, true, 'Logout successful', []);
        } catch (\Exception $e) {
            return $this->successResponse(500, false, 'Terjadi kesalahan saat logout', []);
        }
    }
}
