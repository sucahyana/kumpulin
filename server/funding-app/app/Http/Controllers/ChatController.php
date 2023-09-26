<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    // Mengambil daftar pesan dalam suatu obrolan
    public function index($chat_id)
    {
        // Pastikan pengguna memiliki akses ke obrolan ini
        // Anda dapat menambahkan logika otorisasi di sini

        // Mengambil daftar pesan dalam obrolan
        $messages = Message::where('chat_id', $chat_id)->get();

        return response()->json(['messages' => $messages]);
    }

    // Mengirim pesan dalam suatu obrolan
    public function store(Request $request, $chat_id)
    {
        // Pastikan pengguna memiliki akses ke obrolan ini
        // Anda dapat menambahkan logika otorisasi di sini

        // Validasi data pesan dari request
        $this->validate($request, [
            'content' => 'required|string',
        ]);

        // Buat pesan baru
        $message = new Message();
        $message->content = $request->input('content');
        $message->chat_id = $chat_id;
        $message->user_id = Auth::id(); // ID pengguna yang mengirim pesan
        $message->save();

        return response()->json(['message' => 'Pesan berhasil dikirim']);
    }

    // Menghapus pesan
    public function destroy($id)
    {
        // Pastikan pengguna memiliki akses untuk menghapus pesan
        // Anda dapat menambahkan logika otorisasi di sini

        $message = Message::find($id);

        if (!$message) {
            return response()->json(['message' => 'Pesan tidak ditemukan'], 404);
        }

        $message->delete();

        return response()->json(['message' => 'Pesan berhasil dihapus']);
    }
}
