<?php

namespace App\Services;

use App\Models\EventHistory;
use App\Models\EventParticipant;
use App\Models\Events;
use App\Models\EventMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

class EventService
{
    public function validateCreateEvent(Request $request)
    {
        return Validator::make($request->all(), [
            'title' => 'required|max:255',
            'description' => 'required|string',
            'media' => 'required|array',
            'media.*.media_category' => 'required|in:video,image',
            'media.*.media' => 'required|file|mimes:jpg,jpeg,png|max:2048',
            'category' => 'required|in:pre-order,travel,arisan',
            'maxParticipants' => 'required|numeric|min:0',
            'amountPerson' => 'required|numeric|min:0',
            'startDate' => 'required|date|after:today',
            'endDate' => 'required|date|after_or_equal:startDate'
        ]);
    }

    public function createEvent(Request $request)
    {
        $user = Auth::user();
        $eventData = [
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->startDate,
            'end_date' => $request->endDate,
            'category' => $request->category,
            'max_participant' => $request->maxParticipants,
            'amount_person' => $request->amountPerson,
            'id_user' => $user->id
        ];

        $event = Events::create($eventData);
        $participant =
            EventParticipant::create([
                'id_event' => $event->id,
                'id_user' => Auth::id(),
                'status' => EventParticipant::STATUS_BERGABUNG,
                'description' => 'Consistent adalah salah satu kunci sukses',
                'payment_amount'=> '0'
            ]);
        EventHistory::create([
            'id_event' => $event->id,
            'id_user' => Auth::id(),
            'status' => EventParticipant::STATUS_BERGABUNG,
            'description' => 'Consistent adalah salah satu kunci sukses',
            'action' => 'Membuat Acara'
        ]);

        foreach ($request->media as $mediaItem) {
            $uploadedImage = Cloudinary::upload($mediaItem['media']->getRealPath(), [
                'folder' => 'funding-app/Event/' . $event->id . '/media',
            ]);

            $mediaData = [
                'id_event' => $event->id,
                'media_category' => $mediaItem['media_category'],
                'media_url' => $uploadedImage->getSecurePath(),
            ];

            EventMedia::create($mediaData);
        }

        return $event;
    }

    public function validateUpdateEvent(Request $request)
    {
        return Validator::make($request->all(), [
            'title' => 'sometimes|required|max:255',
            'description' => 'sometimes|required|string',
            'media' => 'sometimes|required|array',
            'media.*.media_category' => 'sometimes|required|in:video,image',
            'media.*.media' => 'sometimes|required|file|mimes:jpg,jpeg,png|max:2048',
            'category' => 'sometimes|required|in:pre-order,travel,arisan',
            'maxParticipants' => 'sometimes|required|numeric|min:0',
            'amountPerson' => 'sometimes|required|numeric|min:0',
            'startDate' => 'sometimes|required|date|after:today',
            'endDate' => 'sometimes|required|date|after_or_equal:startDate',
            'deletedMedia' => 'sometimes|array',
            'deletedMedia.*' => 'sometimes|required|string|url',
            'reorderedMedia' => 'sometimes|array',
            'reorderedMedia.*' => 'sometimes|required|string|url',

        ]);
    }

    public function getEventByCode($eventCode)
    {
        $event = Events::with([
            'user:id,name,profile_image',
            'event_media',
            'event_participant',
            'event_participant.user',
            'event_history' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
            'event_history.user:id,profile_image'  // Menambahkan relasi ini
        ])
            ->where('code_event', $eventCode)
            ->first();

        return $event;
    }



    public function updateEvent(Request $request, $eventCode)
    {
        $event = Events::where('code_event', $eventCode)->first();
        if (!$event) {
            return null;
        }

        // Update event attributes
        if ($request->has('title')) {
            $event->title = $request->title;
        }
        if ($request->has('description')) {
            $event->description = $request->description;
        }
        if ($request->has('start_date')) {
            $event->start_date = $request->start_date;
        }
        if ($request->has('end_date')) {
            $event->end_date = $request->end_date;
        }
        if ($request->has('category')) {
            $event->category = $request->category;
        }
        if ($request->has('max_participant')) {
            $event->max_participant = $request->max_participant;
        }
        if ($request->has('amount_person')) {
            $event->amount_person = $request->amount_person;
        }

        // Update media
        if ($request->has('media')) {
            foreach ($request->media as $index => $mediaItem) {
                $uploadedImage = Cloudinary::upload($mediaItem['media']->getRealPath(), [
                    'folder' => 'funding-app/Event/' . $event->id . '/media',
                ]);
                $mediaData = [
                    'id_event' => $event->id,
                    'media_category' => $mediaItem['media_category'],
                    'media_url' => $uploadedImage->getSecurePath(),
                    'order' => $index + 1
                ];
                EventMedia::create($mediaData);
            }
        }

        // Delete media
        if ($request->has('deletedMedia')) {
            foreach ($request->deletedMedia as $deletedUrl) {
                $mediaToDelete = EventMedia::where('media_url', $deletedUrl)->first();
                if ($mediaToDelete) {
                    $publicId = $this->getPublicIdFromUrl($mediaToDelete->media_url, 'funding-app/Event/' . $event->id . '/media/');
                    Cloudinary::destroy($publicId);

                    $mediaToDelete->delete();
                }
            }
        }

        // Reorder media
        if ($request->has('reorderedMedia')) {
            foreach ($request->reorderedMedia as $index => $reorderedUrl) {
                $mediaToUpdate = EventMedia::where('media_url', $reorderedUrl)->first();
                if ($mediaToUpdate) {
                    $mediaToUpdate->order = $index;
                    $mediaToUpdate->save();
                }
            }
        }

        $event->save();
        return $event;
    }

    public function getPublicIdFromUrl($url, $folderPath)
    {
        return $folderPath . basename(parse_url($url, PHP_URL_PATH), "." . pathinfo($url, PATHINFO_EXTENSION));
    }
}
