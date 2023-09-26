<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;


/**
 * Class Event
 *
 * @property string $id
 * @property string $title
 * @property string $description
 * @property string $amount_person
 * @property string|null $amount_purpose
 * @property string $category
 * @property Carbon $start_date
 * @property Carbon $end_date
 * @property int $max_participant
 * @property string $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @property User $user
 * @property EventHistory $event_history
 * @property EventParticipant $event_participant
 * @property Collection|EventMedia[] $events_media
 * @property Collection|Notification[] $notifications
 *
 * @package App\Models
 */
class Events extends Model implements AuthenticatableContract,Auditable

{
    use SoftDeletes;
    use \OwenIt\Auditing\Auditable,HasApiTokens,Notifiable,uuid,Authenticatable;
    protected $table = 'events';
    public $incrementing = false;

    protected $casts = [
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'max_participant' => 'int'
    ];

    protected $fillable = [
        'title',
        'description',
        'amount_person',
        'amount_purpose',
        'category',
        'start_date',
        'end_date',
        'max_participant',
        'id_user',
        'code_event'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }


    public function event_history()
    {
        return $this->hasMany(EventHistory::class, 'id_event', 'id');
    }

    public function event_participant()
    {
        return $this->hasMany(EventParticipant::class,'id_event', 'id');
    }

    public function event_media()
    {
        return $this->hasMany(EventMedia::class, 'id_event', 'id');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
    public function messages()
    {
        return $this->hasMany(Message::class, 'id_event', 'id');
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($randomString) {

            $uppercaseRandomString = Str::upper(Str::random(5));
            $randomString->code_event = $uppercaseRandomString;
        });
    }

}
