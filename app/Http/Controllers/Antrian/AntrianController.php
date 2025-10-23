<?php

namespace App\Http\Controllers\Antrian;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AntrianController extends Controller
{
    public function index()
    {
        $today = Carbon::today();


        $totalAntrian = DB::table('visits_queue')
            ->whereDate('tanggal', $today)
            ->count();

        $totalMenunggu = DB::table('visits_queue')
            ->whereDate('tanggal', $today)
            ->where('status', 'menunggu')
            ->count();

        $totalProses = DB::table('visits_queue')
            ->whereDate('tanggal', $today)
            ->where('status', 'proses')
            ->count();

        $totalSelesai = DB::table('visits_queue')
            ->whereDate('tanggal', $today)
            ->where('status', 'selesai')
            ->count();

        return Inertia::render('antrian-pasien/antrian', [
            'totalAntrian' => $totalAntrian,
            'totalMenunggu' => $totalMenunggu,
            'totalProses' => $totalProses,
            'totalSelesai' => $totalSelesai,
        ]);
    }

    
}
