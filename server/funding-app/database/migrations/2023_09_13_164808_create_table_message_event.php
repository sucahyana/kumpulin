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
        Schema::create('message_event', function (Blueprint $table) {
            $table->id();
            $table->uuid('id_event');
            $table->timestamps();

            $table->foreign('id_event')->references('id')->on('events')->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_message_event');
    }
};
