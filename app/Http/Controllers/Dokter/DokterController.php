<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DokterController extends Controller
{
    public function indexManageDokter()
    {

        $poli =  DB::table('polikliniks')->get()->map(function ($item) {
            $item->is_open = (bool) $item->is_open;

            return $item;
        });
        return Inertia::render('manage-dokter/manage-dokter', [
            'poli_list'=>$poli,
        ]);
    }
}
