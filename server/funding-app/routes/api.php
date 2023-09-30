<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\EventHistoryController;
use App\Http\Controllers\EventParticipantController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Auth routes
    Route::prefix('auth')->group(function () {
        Route::post('/register', [AuthController::class, 'register'])->name('register');
        Route::post('/login', [AuthController::class, 'login'])->name('login');
        Route::delete('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth:sanctum');
        Route::post('/changePassword', [AuthController::class, 'changePassword'])->name('changePassword')->middleware('auth:sanctum');
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('forgotPassword');
        Route::middleware('auth:sanctum')->post('/reset-password', [AuthController::class, 'resetPassword'])->name('resetPassword');
    });

    // User routes
    Route::middleware('auth:sanctum')->prefix('user')->group(function () {
        Route::put('/basic', [UserController::class, 'updateBasicProfile'])->name('updateBasicProfile');
        Route::put('/contact', [UserController::class, 'updateContactProfile'])->name('updateContactProfile');
        Route::post('/photo', [UserController::class, 'uploadProfilePhoto'])->name('uploadProfilePhoto');
        Route::post('/cover', [UserController::class, 'uploadProfileCover'])->name('uploadProfileCover');
        Route::get('/',[AuthController::class, 'tokenTest']);
        Route::get('/notification',[AuthController::class, 'notification']);
        Route::get('/{user}',[UserController::class, 'show']);
        Route::get('/search', [UserController::class, 'search'])->name('user.search');
    });

    // Event routes
    Route::middleware('auth:sanctum')->prefix('event')->group(function () {
        Route::post('/', [EventController::class, 'createEvent'])->name('createEvent');
        Route::get('/', [EventController::class, 'getAllEventsWithRelations'])->name('getAllEventsWithRelations');
        Route::get('/{eventCode}/code', [EventController::class, 'getEventByCode'])->name('getEventByCode');
        Route::post('/{eventCode}/code', [EventController::class, 'updateEvent'])->name('updateEvent');
        Route::get('/{eventCode}/share', [EventController::class, 'share'])->name('shareEvent');

        Route::prefix('/{eventCode}/participants')->group(function () {
            Route::post('/', [EventParticipantController::class, 'addParticipant'])->name('addParticipant');
            Route::delete('/{participant}', [EventParticipantController::class, 'deleteParticipant'])->name('deleteParticipant');
            Route::put('/approve/{participantId}', [EventParticipantController::class, 'approveParticipant'])->name('approveParticipant');
            Route::put('/reject/{participantId}', [EventParticipantController::class, 'rejectParticipant'])->name('rejectParticipant');
            Route::post('/updatePaymentStatus/{participant}', [EventParticipantController::class, 'updatePaymentStatus'])->name('updatePaymentStatus');
            Route::put('/join', [EventParticipantController::class, 'joinEvent'])->name('joinEvent');
        });

        Route::post('/registerWithCode', [EventParticipantController::class, 'registerWithCode'])->name('registerWithCode');
        Route::get('/{id}/history', [EventHistoryController::class, 'history']);
    });


    // Search route
    Route::middleware('auth:sanctum')->get('/search', [SearchController::class, 'search'])->name('search');
});
