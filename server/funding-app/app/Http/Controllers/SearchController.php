<?php

namespace App\Http\Controllers;

use App\Models\Events;
use App\Models\User;

use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $searchTerm = $request->input('q');

        $users = User::where('name', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('telphone', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('email', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('birth_place', 'LIKE', '%' . $searchTerm . '%')
            ->orWhereHas('contacts', function ($query) use ($searchTerm) {
                $query->where('value', 'LIKE', '%' . $searchTerm . '%');
            })
            ->with('contacts')
            ->get();

        $events = Events::where('title', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('category', 'LIKE', '%' . $searchTerm . '%')
            ->with('event_media')
            ->get();

        return response()->json([
            'users' => $users,
            'events' => $events
        ]);
    }

}

