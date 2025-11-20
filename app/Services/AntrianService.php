<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class AntrianService
{


public function getAntrianStats()
{
    $start = now()->startOfDay();
    $end   = now()->endOfDay();

    $stats = DB::table('visits_queue')
        ->selectRaw("
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'menunggu' THEN 1 ELSE 0 END) AS menunggu,
            SUM(CASE WHEN status = 'proses' THEN 1 ELSE 0 END) AS proses,
            SUM(CASE WHEN status = 'selesai' THEN 1 ELSE 0 END) AS selesai
        ")
        ->whereBetween('waktu_daftar', [$start, $end])
        ->first();


    return [
        'total' => (int) $stats->total,
        'menunggu' => (int) $stats->menunggu,
        'proses' => (int) $stats->proses,
        'selesai' => (int) $stats->selesai,
    ];
}


 public function getAntrians( string $poli_name)
{
    $startOfDay = now('Asia/Jakarta')->startOfDay();
    $endOfDay = now('Asia/Jakarta')->endOfDay();

    $query = DB::table('visits_queue as vq')
        ->join('patients as p', 'vq.pasien_id', '=', 'p.id')
        ->join('polikliniks as pk', 'vq.poliklinik_id', '=', 'pk.id')
        ->select(
            'vq.id',
            'vq.nomor_antrian',
            'vq.status',
            'vq.tanggal',
            'vq.waktu_daftar',
            'p.no_rm',
            'p.nama_pasien',
            'pk.nama as nama_poliklinik',
        )
        ->where('pk.nama', $poli_name)
        ->whereBetween('vq.tanggal', [$startOfDay, $endOfDay]);

    return $query->get();
}


}
