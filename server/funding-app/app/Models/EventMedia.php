<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use OwenIt\Auditing\Contracts\Auditable;


/**
 * Class EventMedia
 *
 * @property string $id
 * @property string $event_id
 * @property string $media_type
 * @property string $media_url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @property Events $event
 *
 * @package App\Models
 */
class EventMedia extends Model implements AuthenticatableContract,Auditable
{
    use \OwenIt\Auditing\Auditable,HasApiTokens,Notifiable,uuid,Authenticatable;
    use SoftDeletes;

    protected $table = 'event_media';
    public $incrementing = false;

    protected $fillable = [
        'id_event',
        'media_category',
        'media_url'
    ];

    public function events()
    {
        return $this->belongsTo(Events::class ,'id_event');
    }
}
