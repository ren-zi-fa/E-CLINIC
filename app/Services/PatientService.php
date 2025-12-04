<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class PatientService
{
    public function getPasienStats()
    {

        $stats = DB::table('patients')
            ->selectRaw("
            COUNT(*) AS total_pasien,
            SUM(CASE WHEN jenis_kelamin = 'P' THEN 1 ELSE 0 END) AS perempuan,
            SUM(CASE WHEN jenis_kelamin = 'L' THEN 1 ELSE 0 END) AS laki_laki,
            SUM(CASE WHEN usia > 18 THEN 1 ELSE 0 END) AS dewasa,
            SUM(CASE WHEN usia <= 18 THEN 1 ELSE 0 END) AS anak_anak
        ")
            ->first();

        return [
            'total_pasien' => $stats->total_pasien,
            'perempuan' => $stats->perempuan,
            'laki_laki' => $stats->laki_laki,
            'dewasa' => $stats->dewasa,
            'anak_anak' => $stats->anak_anak,
        ];
    }

    public function getPaginatedPatients(Request $request)
    {
            $perPage = $request->input('per_page', 20);
            $search = $request->input('search');
            $sortGender = $request->input('sort_gender');

            $query = DB::table('patients')
                ->select('id', 'no_rm', 'nama_pasien', 'jenis_kelamin', 'usia', 'no_telp', 'alamat')
                ->when($sortGender, function ($q) {
                    $q->orderByRaw("FIELD(jenis_kelamin, 'P', 'L') ASC");
                })
                ->orderBy('id', 'asc')
                ->when($search, function ($q) use ($search) {
                    $q->where(function ($sub) use ($search) {
                        $sub->where('nama_pasien', 'like', "%{$search}%")
                            ->orWhere('no_rm', 'like', "%{$search}%")
                            ->orWhere('alamat', 'like', "%{$search}%");
                    });
                });

            $patients = $query->paginate($perPage)
                ->appends($request->only(['search', 'per_page', 'sort_gender']));

            $patients->getCollection()->transform(fn ($item, $key) => tap($item, function ($i) use ($patients, $key) {
                $i->no = ($patients->firstItem() ?: 0) + $key;
            }));

            $stats = $this->getPasienStats();

            return [
                'patients' => $patients,
                'stats' => $stats,
            ];
    }

}
