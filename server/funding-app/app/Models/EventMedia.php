<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use PUGX\Shortid\Factory;
use PUGX\Shortid\Shortid;


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
class EventMedia extends Model implements AuthenticatableContract
{
    use HasApiTokens,Notifiable,Authenticatable;
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
    public function getRouteKeyName()
    {
        return 'id';
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $factory = new Factory();
            $factory->setLength(16);
            Shortid::setFactory($factory);
            $model->{$model->getRouteKeyName()} = Shortid::generate();
        });
    }
}
