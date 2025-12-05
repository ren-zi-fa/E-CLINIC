<?php

use App\Http\Controllers\Antrian\AntrianController;
use App\Http\Controllers\Dokter\DokterController;
use App\Http\Controllers\JadwalPraktik\JadwalPraktikController;
use App\Http\Controllers\Pasien\PasienController;
use App\Http\Controllers\Poliklinik\PoliklinikController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('pasien-daftar')->name('pasienDaftar.')->group(function () {
        Route::get('/', [PasienController::class, 'index'])->name('index');
        Route::get('/search', [PasienController::class, 'search'])->name('search');
        Route::post('step-1', [PasienController::class, 'handleStep1'])->name('handleStep1');
        Route::post('step-1-exist', [PasienController::class, 'handleStep1ExistingPatient'])->name('handleStep1ExistingPatient');
        Route::get('step-2', [PasienController::class, 'indexStep2'])->name('indexstep2');
        Route::get('step-3', [PasienController::class, 'indexStep3'])->name('indexstep3');
        Route::post('step-3', [PasienController::class, 'handleStep2'])->name('handleStep2');
        Route::post('final', [PasienController::class, 'handleStep3'])->name('handleStep3');
        Route::get('success/{pasien_id}', [PasienController::class, 'success'])->name('success');
    });

    Route::put('manage-dokter/{id}/update', [DokterController::class, 'update'])->name('manage_dokter.update');
    Route::get('manage-dokter/{name}/edit', [DokterController::class, 'edit'])->name('manage_dokter.edit');
    Route::get('manage-dokter/tambah', [DokterController::class, 'tambah'])->name('manage_dokter.tambah');
    Route::post('manage-dokter/tambah', [DokterController::class, 'insert'])->name('manage_dokter.insert');

    Route::get('manage-pasien', [PasienController::class, 'indexManagePasien'])->name('manage_pasien.index');
    Route::get('manage-dokter', [DokterController::class, 'indexManageDokter'])->name('manage_dokter.index');
    Route::get('dokter', [DokterController::class, 'search'])->name('manage_dokter.search');
    Route::get('list-jadwal', JadwalPraktikController::class)->name('jadwal_praktik.index');

    Route::get('poliklinik', [PoliklinikController::class, 'getListPoli'])->name('poliklinik.list');
    Route::put('/poliklinik/update_status', [PoliklinikController::class, 'updateStatus'])->name('poliklinik.status');
    Route::get('antrian', [AntrianController::class, 'showByPoli'])->name('antrian.byPoli');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
