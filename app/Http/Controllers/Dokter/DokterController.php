<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DokterController extends Controller
{
    public function indexManageDokter()
    {
        $data = DB::table('doctors')->join('users', 'users.id', '=', 'doctors.user_id')
            ->select(
                'doctors.*',
                'users.name'
            )->get()->map(function ($doctor) {
                $doctor->jadwal_praktik = json_decode($doctor->jadwal_praktik, true);
                return $doctor;
            });
        return Inertia::render('manage-dokter/manage-dokter', [
            'data' => $data
        ]);
    }
}
