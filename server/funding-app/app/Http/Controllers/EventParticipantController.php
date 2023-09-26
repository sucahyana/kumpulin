<?php

namespace App\Http\Controllers;

use App\Models\EventParticipant;
use App\Models\Events;
use App\Models\EventHistory;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class EventParticipantController extends Controller
{
    use ResponseTrait;

    public function addParticipant(Request $request, Events $event)
    {
        try {
            if ($event->id_user !== Auth::id()) {
                throw new \Exception('Hanya Pembuat Acara yang bisa menambahkan peserta ini.', 403);
            }

            $this->validateParticipant($request);

            DB::beginTransaction();

            $participant = EventParticipant::create([
                'id_event' => $event->id,
                'id_user' => $request->id_user,
                'status' => EventParticipant::STATUS_BERGABUNG,
            ]);
            EventHistory::create([
                'id_event' => $event->id,
                'id_user' => Auth::id(),
                'status' => EventParticipant::STATUS_BERGABUNG,
                'description' => 'Ditambahkan langsung oleh Pembuat Acara',
            ]);

            DB::commit();

            return $this->successResponse(200, true, 'Peserta berhasil ditambahkan.', ['participant' => $participant]);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(500, $e->getCode(), 'Error', $e->getMessage());

        }
    }

    protected function validateParticipant(Request $request)
    {
        $rules = [
            'id_user' => [
                'required',
                Rule::exists('users', 'id')
            ]
        ];

        return $request->validate($rules);
    }

    public function deleteParticipant(EventParticipant $participant)
    {
        try {
            DB::beginTransaction();

            $participant->deleteParticipant();
            EventHistory::create([
                'id_event' => $participant->event->id,
                'id_user' => Auth::id(),
                'status' => EventParticipant::STATUS_DIHAPUS,
                'description' => 'Peserta dihapus oleh Pembuat Acara',
            ]);

            DB::commit();

            return $this->successResponse(200, true, 'Peserta berhasil dihapus.', []);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(500, $e->getCode(), 'Error', $e->getMessage());
        }
    }


    public function approveParticipant(Request $request, $eventCode, $participantId)
    {
        $participant = EventParticipant::getByEventCodeAndId($eventCode, $participantId);
        if (!$participant) {
            return $this->errorResponse(404, 'EventParticipant tidak ditemukan.', []);
        }
        if ($participant->status === EventParticipant::STATUS_BERGABUNG) {
            Log::info('Peserta sudah disetujui sebelumnya', ['event_participant_id' => $participant->id]);
            return $this->errorResponse(400, 'Peserta sudah disetujui sebelumnya.', []);
        }
        try {
            DB::beginTransaction();
            $participant->approve();
            DB::commit();
            Log::info('Peserta berhasil disetujui', ['event_participant_id' => $participant->id]);
            return $this->successResponse(200, true, 'Peserta berhasil disetujui.', []);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Terjadi kesalahan saat menyetujui peserta: ' . $e->getMessage(), ['event_participant_id' => $participant->id]);
            return $this->errorResponse(500, $e->getMessage(), []);
        }
    }


    public function rejectParticipant(EventParticipant $participant)
    {
        try {
            DB::beginTransaction();

            $participant->rejectParticipant();

            EventHistory::create([
                'id_event' => $participant->event->id,
                'id_user' => Auth::id(),
                'status' => EventParticipant::STATUS_DITOLAK,
                'description' => 'Peserta ditolak oleh Pembuat Acara',
            ]);

            DB::commit();

            return $this->successResponse(200, true, 'Peserta berhasil ditolak.', []);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->errorResponse(500, $e->getCode(), 'Error', $e->getMessage());
        }
    }

    public function updatePaymentStatus(Request $request, $eventCode, $participantId)
    {
        try {
            $participant = EventParticipant::findOrFail($participantId);

            $this->validateParticipantPayment($request, $participant->event);

            $amount = (float)$request->payment_amount;
            $description = $request->description;
            $currentPaymentAmount = (float) $participant->payment_amount;
            $newPaymentAmount = $currentPaymentAmount + $amount;
            if ($newPaymentAmount < 0) {
                throw new \Exception('Payment amount cannot go below 0.', 422);
            }
            DB::transaction(function () use ($amount, $participant, $description) {
                $participant->payment_amount += $amount;
                $participant->save();

                $action = $amount > 0 ? 'Menambahkan Pembayaran' : 'Mengurangkan Pembayaran';
                $status = $amount > 0 ? '+' . abs($amount) : '-' . abs($amount);



                EventHistory::create([
                    'id_event' => $participant->event->id,
                    'id_user' => $participant->id_user,
                    'status' => $status,
                    'description' => $description,
                    'action' => $action . ' ' . abs($amount)
                ]);

                Log::info('Payment status updated successfully for participant ID: ' . $participant->id);
            });

            return $this->successResponse(200, true, 'Pembayaran berhasil diperbarui.', ['participant' => $participant]);
        } catch (ModelNotFoundException $e) {
            return $this->errorResponse(404, 'Not Found', 'Partisipan tidak ditemukan.');
        } catch (ValidationException $e) {
            return $this->errorResponse(422, $e->getCode(), 'Validasi Gagal', $e->errors());
        } catch (\Exception $e) {
            Log::error('Error while updating payment status: ' . $e->getMessage());
            return $this->errorResponse(500, $e->getCode(), 'Terjadi Kesalahan', $e->getMessage());
        }
    }


    protected function validateParticipantPayment(Request $request, Events $event)
    {
        $rules = [
            'payment_amount' => [
                'required',
                'numeric',
                'not_in:0',
                'max:' . ($event->amount_person - $event->payment_amount)
            ]


        ];

        return $request->validate($rules);
    }

    public function registerWithCode(Request $request)
    {
        DB::beginTransaction();

        try {
            $this->validate($request, [
                'code_event' => 'required|exists:events,code_event',
                'description' => 'required|string|max:255',
            ], [
                'code_event.required' => 'Kode acara diperlukan.',
                'code_event.exists' => 'Kode acara yang diinput tidak valid.',
                'description.required' => 'Deskripsi atau alasannya tidak ada.',
                'description.max' => 'Deskripsi atau alasannya melebihi 255 karakter.',
            ]);

            $user = Auth::user();
            $codeEvent = $request->input('code_event');

            $event = Events::where('code_event', $codeEvent)->first();

            if (!$event) {
                throw new \Exception('Kode acara tidak valid.', 404);
            }

            $participantExists = $event->event_participant()
                ->where('id_user', $user->id)
                ->exists();

            if ($participantExists) {
                throw new \Exception('Anda sudah terdaftar pada acara ini.', 400);
            }

            $participant = EventParticipant::create([
                'id_event' => $event->id,
                'id_user' => $user->id,
                'status' => EventParticipant::STATUS_PENDING,
                'description' => $request->input('description'),
            ]);

            EventHistory::create([
                'id_event' => $event->id,
                'id_user' => $user->id,
                'status' => EventParticipant::STATUS_PENDING,
                'description' => 'Mengajukan permintaan untuk bergabung dengan acara',
            ]);

            DB::commit();

            Log::info('Pendaftaran berhasil dilakukan.');

            return response()->json([
                'message' => 'Anda berhasil bergabung dengan acara.',
                'participant' => $participant,
            ], 200);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Kesalahan Validasi',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Terjadi kesalahan: ' . $e->getMessage());

            $statusCode = $e->getCode() >= 400 && $e->getCode() < 500 ? $e->getCode() : 500;

            return response()->json([
                'message' => $e->getMessage(),
            ], $statusCode);
        }
    }
    public function joinEvent(Request $request, $eventCode)
    {
        try {
            DB::beginTransaction();
            $this->validate($request, [
                'description' => 'required|string|max:255',
            ], [
                'description.required' => 'Deskripsi atau alasannya tidak ada.',
                'description.max' => 'Deskripsi atau alasannya melebihi 255 karakter.',
            ]);

            $event = Events::where('code_event', $eventCode)->first();

            if (!$event) {
                Log::error('Kode acara tidak valid.', ['event_code' => $eventCode]);
                throw new \Exception('Kode acara tidak valid.', 404);
            }
            $existingParticipant = $event->event_participant()
                ->where('id_user', Auth::id())
                ->first();

            if ($existingParticipant) {
                Log::info('Pengguna sudah ada dalam data Participant sebelumnya.', ['user_id' => Auth::id(), 'event_id' => $event->id]);
                throw new \Exception('Anda sudah ada didalam data Participant dengan Status: ' . $existingParticipant->status, 400);
            }

            $newParticipant = EventParticipant::create([
                'id_event' => $event->id,
                'id_user' => Auth::id(),
                'status' => EventParticipant::STATUS_PENDING,
            ]);

            $eventHistory = EventHistory::create([
                'id_event' => $event->id,
                'id_user' => Auth::id(),
                'status' => EventParticipant::STATUS_PENDING,
                'description' => 'Mengajukan permintaan untuk bergabung dengan acara',
            ]);

            DB::commit();

            Log::info('Permintaan bergabung dengan acara berhasil diajukan.', ['user_id' => Auth::id(), 'event_id' => $event->id]);

            return $this->successResponse(200, true, 'Permintaan bergabung dengan acara berhasil diajukan.', ['participant' => $newParticipant]);
        } catch (ValidationException $e) {
            DB::rollBack();
            Log::error('Terjadi kesalahan validasi: ' . $e->getMessage(), ['user_id' => Auth::id(), 'event_code' => $eventCode]);
            return $this->errorResponse(422, $e->getMessage(), "Terjadi Kesalahan saat proses... " . $e->getMessage());
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Terjadi kesalahan saat bergabung dengan acara: ' . $e->getMessage(), ['user_id' => Auth::id(), 'event_code' => $eventCode]);
            return $this->errorResponse($e->getCode(), $e->getMessage(), "Terjadi Kesalahan saat proses... " . $e->getMessage());
        }
    }



}
