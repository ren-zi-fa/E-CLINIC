<?php

use App\Services\AntrianService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

beforeEach(function () {
    // Bersihkan data untuk setiap test
    DB::table('patients')->truncate();
    DB::table('visits_queue')->truncate();
    DB::table('polikliniks')->truncate();

    // Masukkan data dummy

    $this->poli1 = DB::table('polikliniks')->insertGetId([
        'nama' => 'Anak',
        'is_open' => true
    ]);
    $this->poli2 = DB::table('polikliniks')->insertGetId([
        'nama' => 'Gigi',
        'is_open' => false
    ]);

    $now = now();
    $this->patient1 = DB::table('patients')->insertGetId([
        'nama_pasien' => 'John Doe',
        'nama_pendaftar' => 'Admin',
        'keluhan_sakit' => 'Demam dan pusing',
        'usia' => 25,
        'jenis_kelamin' => 'L',
        'no_rm' => 'RM001',
        'no_nik' => '1234567890123456',
        'no_telp' => '081234567890',
        'alamat' => 'Jl. Mawar No. 1',
        'pembayaran' => 'umum',
        'no_bpjs' => null,
        'waktu_daftar' => $now,

    ]);

    $this->patient2 = DB::table('patients')->insertGetId([
        'nama_pasien' => 'Jane Smith',
        'nama_pendaftar' => 'Ucok',
        'keluhan_sakit' => 'Muntah dan pusing',
        'usia' => 23,
        'jenis_kelamin' => 'L',
        'no_rm' => 'RM005',
        'no_nik' => '123456573456',
        'no_telp' => '08123456567890',
        'alamat' => 'Jl. Mawar No. 6',
        'pembayaran' => 'umum',
        'no_bpjs' => null,
        'waktu_daftar' => $now,
    ]);

    $today = Carbon::today();

    DB::table('visits_queue')->insert([
        [
            'pasien_id' => $this->patient1,
            'poliklinik_id' => $this->poli1,
            'nomor_antrian' => 1,
            'status' => 'menunggu',
            'tanggal' => $today,
            'created_at' => now(),
            'updated_at' => now(),
        ],
        [
            'pasien_id' => $this->patient2,
            'poliklinik_id' => $this->poli2,
            'nomor_antrian' => 2,
            'status' => 'proses',
            'tanggal' => $today,
            'created_at' => now(),
            'updated_at' => now(),
        ],
    ]);

    $this->service = new AntrianService();
});

test('getAntrianHariIni() returns today queue list', function () {
    $result = $this->service->getAntrianHariIni();

    expect($result)->toHaveCount(2)
        ->and($result[0])->toHaveKeys([
            'id',
            'poliklinik_id',
            'nomor_antrian',
            'status',
            'tanggal',
            'created_at',
            'nama_pasien',
            'no_rm'
        ])
        ->and($result[0]->nama_pasien)->toBe('John Doe');
});

test('getAntrianStats() returns correct stats', function () {
    $stats = $this->service->getAntrianStats();

    expect($stats)
        ->toHaveKeys(['total', 'menunggu', 'proses', 'selesai'])
        ->and($stats['total'])->toBe(2)
        ->and($stats['menunggu'])->toBe(1)
        ->and($stats['proses'])->toBe(1)
        ->and($stats['selesai'])->toBe(0);
});

test('paginateAntrian() returns paginated result with default sorting', function () {
    $result = $this->service->paginateAntrian();

    expect($result->total())->toBe(2)
        ->and($result->items()[0]->nomor_antrian)->toBe(1);
});

test('paginateAntrian() can filter by search term', function () {
    $result = $this->service->paginateAntrian(['search' => 'Jane']);

    expect($result->total())->toBe(1)
        ->and($result->items()[0]->nama_pasien)->toBe('Jane Smith');
});

test('paginateAntrian() can sort by column', function () {
    // Sort descending by nomor_antrian
    $result = $this->service->paginateAntrian(['col' => 'nomor_antrian', 'sort' => 'desc']);

    expect($result->items()[0]->nomor_antrian)->toBe(2);
});
