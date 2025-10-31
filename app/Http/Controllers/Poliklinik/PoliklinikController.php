<?php

namespace App\Http\Controllers\Poliklinik;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PoliklinikController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $polikliniks = DB::table('polikliniks')->get()->map(function ($item) {
            $item->is_open = (bool) $item->is_open;
            return $item;
        });

        return response()->json([
            'polikliniks' => $polikliniks,
        ]);
    }
}
