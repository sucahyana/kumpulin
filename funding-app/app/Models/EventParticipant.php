<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EventParticipant
 * 
 * @property string $id
 * @property string $status
 * @property string $payment_amount
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string $user_id
 * @property string $event_id
 * 
 * @property Event $event
 * @property User $user
 *
 * @package App\Models
 */
class EventParticipant extends Model
{
	protected $table = 'event_participant';
	public $incrementing = false;

	protected $fillable = [
		'id',
		'status',
		'payment_amount',
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
