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
        Schema::create('events_media', function (Blueprint $table) {
            $table->uuid('event_media_id')->primary();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->enum('media_type',['video','image']);
            $table->string('media_url');
            $table->timestamps();
            $table->softDeletes();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events_image');
    }
};
