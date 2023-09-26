<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
 * @property Event $event
 *
 * @package App\Models
 */
class EventMedia extends Model
{
	use SoftDeletes;
	protected $table = 'event_media';
	public $incrementing = false;

	protected $fillable = [
		'event_id',
		'media_type',
		'media_url'
	];

	public function event()
	{
		return $this->belongsTo(Event::class);
	}
}
