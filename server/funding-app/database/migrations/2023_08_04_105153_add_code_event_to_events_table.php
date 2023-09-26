<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCodeEventToEventsTable extends Migration
{
/**
* Run the migrations.
*
* @return void
*/
public function up()
{
Schema::table('events', function (Blueprint $table) {
// Add the code_event column
$table->string('code_event')->unique()->nullable();
});
}

/**
* Reverse the migrations.
*
* @return void
*/
public function down()
{
Schema::table('events', function (Blueprint $table) {
// Drop the code_event column if it exists
$table->dropColumn('code_event');
});
}
}
