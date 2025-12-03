<?php

namespace App\Http\Controllers\Antrian;

use App\Http\Controllers\Controller;
use App\Services\AntrianService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AntrianController extends Controller
{
    protected $antrianService;

    public function __construct(AntrianService $antrianService)
    {
        $this->antrianService = $antrianService;
    }

    public function showByPoli(Request $request)
    {
        // ambil tab -> default 0
        $tab = (int) $request->query('tab', 0);

        // ambil semua poliklinik
        $polikliniks = DB::table('polikliniks')
            ->select('nama')
            ->orderBy('id', 'asc')  
            ->get();

        // tentukan poli berdasarkan index tab
        $poli = $polikliniks[$tab]->nama ?? null;

        // ambil data antrian
        $antrian = $this->antrianService->getAntrians($poli);
        $stats = $this->antrianService->getAntrianStats();

        return Inertia::render('antrian-pasien/antrian', [
            'antrians' => $antrian,
            'totalAntrian' => $stats['total'],
            'totalMenunggu' => $stats['menunggu'],
            'totalProses' => $stats['proses'],
            'totalSelesai' => $stats['selesai'],
            'tab' => $tab,
            'polikliniks' => $polikliniks,
        ]);
    }

}
