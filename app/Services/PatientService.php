<?php

namespace App\Services;

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
}
