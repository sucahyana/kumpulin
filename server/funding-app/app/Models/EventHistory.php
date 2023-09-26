<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

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
 * @property Event $event
 * @property User $user
 *
 * @package App\Models
 */
class EventHistory extends Model
{
    use \OwenIt\Auditing\Auditable;
    use HasApiTokens;

    protected $table = 'event_history';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'status',
        'description',
        'user_id',
        'event_id'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
