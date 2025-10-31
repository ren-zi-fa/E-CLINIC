<?php

use App\Http\Controllers\Antrian\AntrianController;
use App\Http\Controllers\Pasien\PasienController;
use App\Http\Controllers\Poliklinik\PoliklinikController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('pasien-daftar')->name('pasienDaftar.')->group(function () {
        Route::get('/', [PasienController::class, 'index'])->name('index');
        Route::get('search', [PasienController::class, 'search'])->name('search');
    });

    Route::prefix('pasien')->name('pasien.')->group(function () {
        Route::post('baru', [PasienController::class, 'storeNew'])->name('baru.store');
        Route::patch('lama', [PasienController::class, 'storeOld'])->name('lama.store');
    });
    Route::get('antrian', [AntrianController::class, 'index'])->name('antrian.index');
    Route::get('poliklinik', PoliklinikController::class)->name('poliklinik.list');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
