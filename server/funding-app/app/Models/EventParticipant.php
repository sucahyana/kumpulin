<?php

namespace App\Models;

use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Auth;


class EventParticipant extends Model implements AuthenticatableContract, \OwenIt\Auditing\Contracts\Auditable
{
    use \OwenIt\Auditing\Auditable, HasApiTokens, Notifiable, Uuid, Authenticatable;

    const STATUS_BERGABUNG = 'Bergabung';
    const STATUS_PENDING = 'Ingin ikut Acara';
    const STATUS_DITOLAK = 'Ditolak';
    const STATUS_DIHAPUS = 'Dihapus';

    public $incrementing = false;
    protected $table = 'event_participant';
    protected $fillable = [
        'status',
        'payment_amount',
        'id_user',
        'id_event',
        'description'
    ];

    public function event()
    {
        return $this->belongsTo(Events::class, 'id_event');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
    public function eventHistories()
    {
        return $this->hasMany(EventHistory::class, 'id_user', 'id_user');
    }

    public function deleteParticipant()
    {
        $this->delete();
    }
    public function approveParticipant($userId)
    {
        if ($this->status === self::STATUS_BERGABUNG) {
            return; // Tidak perlu memperbarui jika status sudah bergabung
        }

        $this->status = self::STATUS_BERGABUNG;
        $this->description = 'Disetujui';
        $this->id_user = $userId; // Atur nilai id_user
        $this->save();
    }


    public function rejectParticipant()
    {
        $this->status = self::STATUS_DITOLAK;
        $this->description = 'Ditolak';
        $this->save();
    }
    public function moveStatusToDescription($oldStatus)
    {
        if ($oldStatus !== self::STATUS_BERGABUNG && $oldStatus !== self::STATUS_PENDING && $oldStatus !== self::STATUS_DITOLAK && $oldStatus !== self::STATUS_DIHAPUS) {
            $this->description = $oldStatus;
            $this->save();
        }
    }
    public function updatePaymentStatus($amount)
    {
        $event = $this->event;
        $maxAllowable = $event->amount_person - $this->payment_amount;
        $minAllowable = -$this->payment_amount;

        if ($amount < $minAllowable || $amount > $maxAllowable) {
            throw new \InvalidArgumentException('Jumlah pembayaran tidak valid.');
        }

        $this->payment_amount += $amount;
        $this->save();


        if ($this->payment_amount >= $event->amount_person) {
            $this->status = self::STATUS_BERGABUNG;
            $this->description = 'Pembayaran Lunas';
            $this->save();
        }
    }
    public static function getByEventCodeAndId($eventCode, $participantId)
    {
        return static::where('id', $participantId)
            ->whereHas('event', function ($query) use ($eventCode) {
                $query->where('code_event', $eventCode);
            })
            ->first();
    }


    public function approve()
    {
        $this->status = self::STATUS_BERGABUNG;
        $this->description = 'Peserta disetujui';
        $this->save();

        EventHistory::create([
            'id_event' => $this->event->id,
            'id_user' => Auth::id(),
            'status' => self::STATUS_BERGABUNG,
            'description' => 'Peserta disetujui oleh Pembuat Acara',
        ]);
    }
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($paymentDefault) {

            $payment="0";
            $paymentDefault->payment_amount = $payment;
        });
    }

}

