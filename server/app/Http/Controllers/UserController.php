<?php

namespace App\Http\Controllers;

use App\Models\EventParticipant;
use App\Models\User;
use App\Models\UserContact;
use App\Services\UserService; // Import UserService
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Traits\ResponseTrait;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Exception;
use Illuminate\Support\Facades\Log; // Import Log

class UserController extends Controller
{
    use ResponseTrait;
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function updateBasicProfile(Request $request)
    {
        $userData = $request->all();

        $user = $this->userService->updateBasicProfile($userData);

        if (!$user) {
            return response()->json(['message' => 'Pengguna tidak terotentikasi.'], 401);
        }

        if ($user->wasChanged()) {
            return response()->json(['message' => 'Informasi dasar profil berhasil disimpan.'], 200);
        } else {
            return response()->json(['message' => 'Tidak ada perubahan pada informasi dasar profil.'], 422);
        }
    }

    public function updateContactProfile(Request $request)
    {
        $contactData = $request->all();

        $user = $this->userService->updateContactProfile($contactData);

        if (!$user) {
            return response()->json(['message' => 'Token tidak valid.'], 401);
        }

        return response()->json(['message' => 'Informasi kontak profil berhasil disimpan.'], 200);
    }

    public function uploadProfilePhoto(Request $request)
    {
        try {
            $profileImage = $request->file('profile_image');

            $user = $this->userService->uploadProfilePhoto($profileImage);

            if (!$user) {
                return response()->json(['message' => 'Terjadi kesalahan saat mengunggah foto profil.'], 500);
            }

            return response()->json(['message' => 'Foto profil berhasil diunggah.', 'data' => $user], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan pada server: ' . $e->getMessage()], 500);
        }
    }

    public function uploadProfileCover(Request $request)
    {
        try {
            $coverImage = $request->file('cover_image');

            $user = $this->userService->uploadProfileCover($coverImage); // Memanggil UserService

            if (!$user) {
                return response()->json(['message' => 'Terjadi kesalahan saat mengunggah cover profil.'], 500);
            }

            return response()->json(['message' => 'Cover Profil berhasil diunggah.', 'data' => $user], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Terjadi kesalahan pada server: ' . $e->getMessage()], 500);
        }
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        $users = $this->userService->searchUsers($query); // Memanggil UserService

        return response()->json(['users' => $users]);
    }

    public function show(User $user)
    {
        $userData = $this->userService->getUserWithEvents($user);

        return $this->successResponse(200, true, 'User data', $userData);
    }
}
