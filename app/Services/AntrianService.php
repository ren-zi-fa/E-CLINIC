<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AntrianService
{
    public function getAntrianHariIni()
    {
        $today = Carbon::today();

        return DB::table('visits_queue')
            ->select([
                'visits_queue.id',
                'visits_queue.poliklinik_id',
                'visits_queue.nomor_antrian',
                'visits_queue.status',
                'visits_queue.tanggal',
                'visits_queue.created_at',
                'patients.nama_pasien',
                'patients.no_rm',
                'polikliniks.nama as nama_poliklinik',
            ])
            ->join('patients', 'visits_queue.pasien_id', '=', 'patients.id')
            ->join('polikliniks', 'visits_queue.poliklinik_id', '=', 'polikliniks.id')
            ->whereDate('visits_queue.tanggal', $today)
            ->orderBy('visits_queue.nomor_antrian', 'asc')
            ->get();
    }

    public function getAntrianStats()
    {
        $today = Carbon::today();

        return [
            'total' => DB::table('visits_queue')
                ->whereDate('tanggal', $today)
                ->count(),
            'menunggu' => DB::table('visits_queue')
                ->whereDate('tanggal', $today)
                ->where('status', 'menunggu')
                ->count(),
            'proses' => DB::table('visits_queue')
                ->whereDate('tanggal', $today)
                ->where('status', 'proses')
                ->count(),
            'selesai' => DB::table('visits_queue')
                ->whereDate('tanggal', $today)
                ->where('status', 'selesai')
                ->count()
        ];
    }

    /**
     * Return a paginated list of antrian (today) with basic search and sorting.
     * Accepts params: search, limit, col, sort
     *
     * @param array $params
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */

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
