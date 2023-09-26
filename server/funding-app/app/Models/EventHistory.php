<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


/**
 * Class EventHistory
 *
 * @property string $id
 * @property string $status
 * @property string $description
 * @property string $user_id
 * @property string $event_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Events $event
 * @property User $user
 *
 * @package App\Models
 */
class EventHistory extends Model implements AuthenticatableContract, \OwenIt\Auditing\Contracts\Auditable
{
    use \OwenIt\Auditing\Auditable, HasApiTokens, Notifiable, Uuid, Authenticatable;

    protected $table = 'event_history';
    public $incrementing = false;

    protected $fillable = [
        'status',
        'description',
        'id_user',
        'id_event',
        'action'
    ];

    public function events()
    {
        return $this->belongsTo(Events::class, 'id_event',);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user',);
    }
}
