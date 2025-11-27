<?php

namespace App\Http\Controllers\JadwalPraktik;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class JadwalPraktikController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $jadwal = DB::table('doctors')
            ->join('users', 'users.id', '=', 'doctors.user_id')
            ->join('polikliniks', 'polikliniks.id', '=', 'doctors.poliklinik_id')
            ->select(
                'doctors.*',
                'users.name',
                'polikliniks.nama as nama_poli'
            )
            ->orderBy('polikliniks.nama')
            ->orderBy('users.name')
            ->get()
            ->map(function ($doctor) {
                $doctor->jadwal_praktik = json_decode($doctor->jadwal_praktik, true);

                return $doctor;
            });

        return Inertia::render('jadwal-praktik/jadwalPages', [
            'jadwal' => $jadwal,
        ]);
    }
}
