<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;

class PasienController extends Controller
{
    //
    public function storeNew(Request $request)
    {

        $validated = $request->validate([
            'nama_pasien' => 'required|string|max:100',
            'nama_pendaftar' => 'required|string|max:100',
            'keluhan_sakit' => 'required|string|max:255',
            'no_nik' => 'required|numeric|digits:5|unique:patients,no_nik',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'pembayaran' => 'required|in:umum,bpjs',
            'no_bpjs' => 'required_if:pembayaran,bpjs|string|nullable',
            'poliklinik' => 'required|in:umum,gigi,anak,kandungan',
        ]);


        $lastNoRm = Patient::whereYear('created_at', date('Y'))->max('no_rm');

        $number = 1;
        if ($lastNoRm) {
            // Contoh: RM-2025-0012 → ambil 0012 lalu ubah ke int +1
            $number = ((int) substr($lastNoRm, -4)) + 1;
        }

        $nextNoRm = 'RM-' . date('Y') . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
        $validated['no_rm'] = $nextNoRm;

        Patient::create($validated);

        return to_route('pasienDaftar')->with('success', "Data pasien berhasil disimpan dengan nomor rekam medis {$nextNoRm}");
    }


    public function storeOld(Request $request) {}
}
