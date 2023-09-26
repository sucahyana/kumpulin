<?php

namespace App\Models;

use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use OwenIt\Auditing\Contracts\Auditable;

/**
 * Class UserContact
 *
 * @property int $id
 * @property string $type
 * @property string $value
 * @property string $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property User $user
 *
 * @package App\Models
 */
class UserContact extends Model implements Auditable // Tambahkan ini
{
    use \OwenIt\Auditing\Auditable,HasApiTokens,Notifiable,uuid;

    protected $table = 'user_contact';

    protected $fillable = [
        'type',
        'value',
        'id_user'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
