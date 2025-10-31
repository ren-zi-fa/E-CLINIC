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
    public function paginateAntrian(array $params = [])
    {
        $today = Carbon::today();
        $query = DB::table('visits_queue')
            ->select([
                'visits_queue.id',
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
            ->whereDate('visits_queue.tanggal', $today);

        // Basic search on patient name or no_rm
        if (!empty($params['search'])) {
            $search = trim($params['search']);
            $query->where(function ($q) use ($search) {
                $q->where('patients.nama_pasien', 'like', "%{$search}%")
                    ->orWhere('patients.no_rm', 'like', "%{$search}%")
                    ->orWhere('polikliniks.nama', 'like', "%{$search}%");
            });
        }

        $allowed = [
            'nomor_antrian' => 'visits_queue.nomor_antrian',
            'status' => 'visits_queue.status',
            'created_at' => 'visits_queue.created_at',
            'nama_pasien' => 'patients.nama_pasien',
            'no_rm' => 'patients.no_rm',
            'poliklinik' => 'polikliniks.nama',
        ];

        $col = $params['col'] ?? null;
        $dir = (isset($params['sort']) && strtolower($params['sort']) === 'desc') ? 'desc' : 'asc';

        if ($col && array_key_exists($col, $allowed)) {
            $query->orderBy($allowed[$col], $dir);
        } else {
            $query->orderBy('visits_queue.nomor_antrian', 'asc');
        }

        $limit = isset($params['limit']) && is_numeric($params['limit']) ? (int) $params['limit'] : 10;

        return $query->paginate($limit)->withQueryString();
    }
}
