<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


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
class Event extends Model

{
    use SoftDeletes;
    use \OwenIt\Auditing\Auditable,HasApiTokens,Notifiable;
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
        'id_user'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function event_history()
    {
        return $this->hasOne(EventHistory::class);
    }

    public function event_participant()
    {
        return $this->hasOne(EventParticipant::class);
    }

    public function events_media()
    {
        return $this->hasMany(EventMedia::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}
