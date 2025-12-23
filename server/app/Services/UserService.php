<?php

namespace App\Services;

use App\Models\EventParticipant;
use App\Models\User;
use App\Models\UserContact;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserService
{
    public function updateBasicProfile($userData)
    {
        $user = Auth::user();

        if (!$user) {
            return null;
        }

        $data = Validator::make($userData, [
            'name' => 'required|string',
            'birth_date' => 'nullable|date',
            'gender' => 'nullable|string',
            'birth_place' => 'nullable|string',
            'bio' => 'nullable|string',
            'address' => 'nullable|string',
        ])->validate();

        $user->update($data);

        return $user;
    }

    public function updateContactProfile($contactData)
    {
        $user = Auth::user();

        if (!$user) {
            return null;
        }

        $validator = Validator::make($contactData, [
            'instagram' => 'nullable|string',
            'facebook' => 'nullable|string',
            'email' => 'nullable|string|email',
            'telpon' => 'nullable|string',
            'other' => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return null;
        }
        $this->updateContact($user, 'instagram', $contactData['instagram']);
        $this->updateContact($user, 'facebook', $contactData['facebook']);
        $user->email = $contactData['email'] ?? $user->email;
        $user->telphone = $contactData['telpon'] ?? $user->telphone;
        $user->save();
        if (isset($contactData['other'])) {
            foreach ($contactData['other'] as $key => $value) {
                $this->updateContact($user, $key, $value);
            }
        }

        return $user;
    }

    private function updateContact($user, $type, $value)
    {
        UserContact::updateOrCreate(
            ['id_user' => $user->id, 'type' => $type],
            ['value' => $value]
        );
    }

    public function uploadProfilePhoto($profileImage)
    {
        try {
            $user = Auth::user();

            $validator = Validator::make(['profile_image' => $profileImage], [
                    'profile_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
                ]
                , [
                    'profile_image.required' => 'Foto profil harus diunggah.',
                    'profile_image.image' => 'File yang diunggah harus berupa gambar.',
                    'profile_image.mimes' => 'Format gambar harus jpg, jpeg, atau png.',
                    'profile_image.max' => 'Ukuran gambar tidak boleh lebih dari 2MB.',
                ]);

            if ($validator->fails()) {
                return null;
            }

            $folderPath = 'funding-app/User/' . $user->name . '/profile/';
            $uploadedImage = Cloudinary::upload($profileImage->getRealPath(), [
                'folder' => $folderPath,
            ]);
            $imageUrl = $uploadedImage->getSecurePath();

            if ($user->profile_image) {
                $this->deleteCloudinaryImage($user->profile_image, $folderPath);
            }

            $user->profile_image = $imageUrl;
            $user->save();

            return $user;
        } catch (Exception $e) {
            return null;
        }
    }

    private function deleteCloudinaryImage($imageUrl, $folderPath)
    {
        $publicId = $this->getPublicIdFromUrl($imageUrl, $folderPath);

        try {
            Cloudinary::destroy($publicId);
        } catch (Exception $e) {
            Log::error('Error deleting image from Cloudinary: ' . $e->getMessage());
        }
    }

    private function getPublicIdFromUrl($url, $folderPath)
    {
        return $folderPath . basename(parse_url($url, PHP_URL_PATH), "." . pathinfo($url, PATHINFO_EXTENSION));
    }

    public function uploadProfileCover($coverImage)
    {
        try {
            $user = Auth::user();

            $validator = Validator::make(['cover_image' => $coverImage], [
                'cover_image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
            ]);

            if ($validator->fails()) {
                return null;
            }

            $folderPath = 'funding-app/User/' . $user->name . '/cover/';

            $uploadedImage = Cloudinary::upload($coverImage->getRealPath(), [
                'folder' => $folderPath,
            ]);

            $imageUrl = $uploadedImage->getSecurePath();

            if ($user->cover_image) {
                $this->deleteCloudinaryImage($user->cover_image, $folderPath);
            }

            $user->cover_image = $imageUrl;
            $user->save();

            return $user;
        } catch (Exception $e) {
            return null;
        }
    }

    public function searchUsers($query)
    {
        return User::where('name', 'like', '%' . $query . '%')->get();
    }

    public function getUserWithEvents($user)
    {
        $userData = $user->load('contacts');

        $userEvents = EventParticipant::where('id_user', $user->id)
            ->with(['event' => function ($query) {
                $query->with(['event_media', 'event_participant','event_participant.user', 'user:id,name,profile_image']);
            }])
            ->get()
            ->pluck('event');

        return [
            'User' => $userData,
            'UserEvents' => $userEvents,
        ];
    }
}
