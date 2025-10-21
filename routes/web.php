<?php

use App\Http\Controllers\Pasien\PasienController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('pendaftaran-pasien', function () {
        return Inertia::render('pendaftaran-pasien/pendaftaran');
    })->name('pasienDaftar');
    Route::post('register-pasien-lama', [PasienController::class, 'storeOld'])->name('pasien-old.store');
    Route::post('register-pasien-baru', [PasienController::class, 'storeNew'])->name('pasien-new.store');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
