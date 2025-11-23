<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DokterController extends Controller
{
  public function indexManageDokter()
{
        $dokter = DB::table('doctors')
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


    return Inertia::render('manage-dokter/manage-dokter', [
        'dokter'=>$dokter
    ]);
}

}

