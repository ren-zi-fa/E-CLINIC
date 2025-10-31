<?php

namespace App\Http\Controllers\Antrian;

use App\Http\Controllers\Controller;
use App\Services\AntrianService;
use Illuminate\Http\Request;
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
        // return paginated data for the frontend table. The frontend may pass
        // search, limit, col, sort as query params and the helper hook will
        // perform debounced requests.
        $params = $request->only(['search', 'limit', 'col', 'sort']);

        $antrian = $this->antrianService->paginateAntrian($params);

        $stats = $this->antrianService->getAntrianStats();

        return Inertia::render('antrian-pasien/antrian', [
            // pass the paginator (data, meta, links) so frontend components
            // such as TablePagination can use it directly
            'antrian' => $antrian,
            'totalAntrian' => $stats['total'],
            'totalMenunggu' => $stats['menunggu'],
            'totalProses' => $stats['proses'],
            'totalSelesai' => $stats['selesai'],
        ]);
    }
}
