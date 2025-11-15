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

    public function index(Request $request)
    {

        $stats = $this->antrianService->getAntrianStats();
        return Inertia::render('antrian-pasien/antrian', [
            'totalAntrian' => $stats['total'],
            'totalMenunggu' => $stats['menunggu'],
            'totalProses' => $stats['proses'],
            'totalSelesai' => $stats['selesai'],
        ]);
    }


public function showByPoli(Request $request, $name_poli)
{
   
    $antrian = $this->antrianService->getAntrians($name_poli);
    return response()->json(
        [
            'antrian'=>$antrian
        ]
    );
}

}
