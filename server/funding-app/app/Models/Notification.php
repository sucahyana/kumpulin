<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

/**
 * Class Notification
 *
 * @property string $id
 * @property string $content
 * @property string $user_id
 * @property string $event_id
 * @property bool $is_read
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @property Event $event
 * @property User $user
 *
 * @package App\Models
 */
class Notification extends Model
{
    use \OwenIt\Auditing\Auditable;
    use HasApiTokens;
    use SoftDeletes;

    protected $table = 'notifications';
    public $incrementing = false;

    protected $casts = [
        'is_read' => 'bool'
    ];

    protected $fillable = [
        'content',
        'user_id',
        'event_id',
        'is_read'
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
