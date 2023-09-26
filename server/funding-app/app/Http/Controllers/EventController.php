<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Services\EventService;
use Illuminate\Http\Request;
use App\Traits\ResponseTrait;

class EventController extends Controller
{
    use ResponseTrait;

    private $eventService;

    public function __construct(EventService $eventService)
    {
        $this->eventService = $eventService;
    }

    public function createEvent(Request $request)
    {
        $validationResult = $this->eventService->validateCreateEvent($request);

        if ($validationResult->fails()) {
            return $this->errorResponse(422, 'Validasi Gagal', $validationResult->errors());
        }

        try {
            $event = $this->eventService->createEvent($request);
            return $this->successResponse(200, true, 'Event berhasil dibuat', $event);
        } catch (\Exception $e) {
            return $this->errorResponse(500, 'Kesalahan Server', $e->getMessage());
        }
    }

    public function updateEvent(Request $request, $eventCode)
    {
        $validationResult = $this->eventService->validateUpdateEvent($request);

        if ($validationResult->fails()) {
            return $this->errorResponse(422, 'Validasi Gagal', $validationResult->errors());
        }

        $event = $this->eventService->updateEvent($request, $eventCode);

        if (!$event) {
            return $this->errorResponse(404, 'Event tidak ditemukan', []);
        }

        return $this->successResponse(200, true, 'Event berhasil diperbarui', $event);
    }

        public function getEventByCode($eventCode)
        {
            $event = $this->eventService->getEventByCode($eventCode);

            if (!$event) {
                return $this->errorResponse(404, 'Event tidak ditemukan', []);
            }

            return $this->successResponse(200, true, 'Event berhasil diambil', $event);
        }

    public function share(Events $event)
    {
        $url = url('/events/' . $event->id);
        return $this->successResponse(200, true, 'URL berhasil diambil', ['url' => $url]);
    }
    public function getAllEventsWithRelations(Request $request)
    {
        $events = Events::with(['event_media', 'event_participant', 'event_history'])
            ->paginate(10);

        return $this->successResponse(200, true, 'Daftar Event', $events);
    }

}
