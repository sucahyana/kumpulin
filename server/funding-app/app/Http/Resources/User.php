<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{


    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->when($this->email, $this->email),
            'telphone' => $this->when($this->telphone, $this->telphone),
            'bio' => $this->when($this->bio, $this->bio),
            'photo' => $this->when($this->photo, $this->photo)
        ];

    }


}
