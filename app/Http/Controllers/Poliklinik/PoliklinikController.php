<?php

namespace App\Http\Controllers\Poliklinik;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PoliklinikController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function getListPoli(Request $request)
    {
        $polikliniks = DB::table('polikliniks')->get()->map(function ($item) {
            $item->is_open = (bool) $item->is_open;

            return $item;
        });

        return response()->json([
            'polikliniks' => $polikliniks,
        ]);
    }

public function getPoliById($id)
{
    $poli = DB::table('polikliniks')
        ->select('nama', 'kode')
        ->where('id', $id)
        ->first();

    if (!$poli) {
        abort(404, 'poli tidak ditemukan');
    }

    return response()->json([
        'poli' => $poli,
    ]);
}

    public function updateStatus(Request $request)
    {
        $payload = $request->validate(['id' => 'required', 'status' => 'required']);

        if ($payload['status'] === true) {
            DB::table('polikliniks')->where('id', $payload['id'])->update(['is_open' => true]);

            return back();
        } elseif ($payload['status'] === false) {
            DB::table('polikliniks')->where('id', $payload['id'])->update(['is_open' => false]);

            return back();
        }
    }
}
