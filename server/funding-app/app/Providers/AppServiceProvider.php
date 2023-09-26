<?php

namespace App\Providers;

use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use App\Rules\EmailOrPhone;

// use the class that implements the email_or_phone rule
use Illuminate\Support\Facades\Validator;

// use the Validator facade
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {

    }

    /**
     * Bootstrap any application services.
     */

    public function boot()
    {

    }

}
