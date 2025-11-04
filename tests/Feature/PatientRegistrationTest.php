<?php

use App\Services\PatientRegistrationService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

test('registration_new_pasien', function () {
    $service = new PatientRegistrationService();
    DB::table('patients')->truncate();
    DB::table('visits_queue')->truncate();
    $id = DB::table('polikliniks')->inRandomOrder()->value('id');

    $data = [
        'nama_pasien' => 'Budi',
        'nama_pendaftar' => 'Budi',
        'keluhan_sakit' => 'Demam',
        'no_nik' => '1234567890123456',
        'alamat' => 'Jl. Merdeka',
        'no_telp' => '08123456789',
        'pembayaran' => 'umum',
        'poliklinik_id' => $id,
        'jenis_kelamin' => 'L',
        'usia' => 30,
    ];
});
