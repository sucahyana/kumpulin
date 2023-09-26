<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;

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
class UserContact extends Model
{
    use \OwenIt\Auditing\Auditable;
    use HasApiTokens;

    protected $table = 'user_contact';

    protected $fillable = [
        'type',
        'value',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
