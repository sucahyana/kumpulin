<?php


namespace App\Models;

use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;


/**
 * Class User
 *
 * @property string $id
 * @property string $name
 * @property string|null $gender
 * @property string $email
 * @property string $telphone
 * @property string $password
 * @property string|null $profile_image
 * @property string|null $cover_image
 * @property string|null $bio
 * @property Carbon|null $birth_date
 * @property string|null $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @property EventHistory $event_history
 * @property EventParticipant $event_participant
 * @property Collection|events[] $events
 * @property Collection|Notification[] $notifications
 * @property Collection|UserContact[] $user_contacts
 *
 * @package App\Models
 */
class User extends Model implements AuthenticatableContract,Auditable

{
    use \OwenIt\Auditing\Auditable,HasApiTokens,Notifiable,Uuid,Authenticatable,HasFactory,CanResetPassword;
    use SoftDeletes;

    protected $table = 'users';
    public $incrementing = false;
    public $keyType = 'string';
    protected $auditExclude = [
        'published',
    ];

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


}
