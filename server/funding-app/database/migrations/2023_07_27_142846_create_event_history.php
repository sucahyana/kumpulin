<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_history', function (Blueprint $table) {
            $table->uuid('id');
            $table->string('status')->nullable();
            $table->string('description')->nullable();
            $table->string('action')->nullable();
            $table->char('id_user');

            $table->foreign('id_user')->references('id')->on('users');
            $table->char('id_event');

            $table->foreign('id_event')->references('id')->on('events');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_history');
    }
};
