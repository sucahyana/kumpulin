<?php

namespace App\Http\Controllers;

use App\Traits\ResponseTrait;
use App\Models\EventParticipant;
use Illuminate\Http\Request;

class EventHistoryController extends Controller
{
    use ResponseTrait;

    public function history(Request $request)
    {
        $historyData = EventParticipant::with('audits')->get()->map(function ($participant) {
            return $participant->audits->map(function ($audit) {
                return [
                    'date' => $audit->created_at->format('Y-m-d'),
                    'participant' => $audit->user_id,
                    'status' => $audit->getModified()['status'] ?? null,
                    'description' => 'Rp ' . number_format($audit->getModified()['amount'] ?? 0),
                ];
            });
        })->flatten(1);

        return $this->successResponse(200,true, 'Berhasil mengambil History Event' ,$historyData);
    }
}
