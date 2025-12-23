<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use PUGX\Shortid\Factory;
use PUGX\Shortid\Shortid;

class User extends Model implements AuthenticatableContract
{
    use HasApiTokens,Notifiable,Authenticatable,HasFactory,CanResetPassword;
    use SoftDeletes;

    protected $table = 'users';
    public $incrementing = false;
    public $keyType = 'string';

    protected $casts = [
        'birth_date' => 'datetime'
    ];

    protected $hidden = [
        'password'
    ];

    protected $fillable = [
        'name',
        'gender',
        'email',
        'telphone',
        'password',
        'profile_image',
        'cover_image',
        'bio',
        'birth_date',
        'birth_place',
        'address'
    ];

    public function event_history()
    {
        return $this->hasOne(EventHistory::class, 'id_user');
    }

    public function event_participant()
    {
        return $this->hasOne(EventParticipant::class, 'id_user');
    }

    public function Events()
    {
        return $this->hasMany(Events::class, 'id_user');
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }

    public function contacts()
    {
        return $this->hasMany(UserContact::class,'id_user', 'id');
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
