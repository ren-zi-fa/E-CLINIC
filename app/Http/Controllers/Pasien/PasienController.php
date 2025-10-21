<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('pendaftaran-pasien/pendaftaran');
    }

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

        return to_route('pasienDaftar.index')->with('success', "Data pasien berhasil disimpan dengan nomor rekam medis {$nextNoRm}");
    }

    public function storeOld(Request $request)
    {
        $validated = $request->validate([
            'nama_pasien' => 'required|string|max:100',
            'nama_pendaftar' => 'required|string|max:100',
            'keluhan_sakit' => 'required|string|max:255',
            'no_nik' => 'required|numeric|digits:5|exists:patients,no_nik', 
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'pembayaran' => 'required|in:umum,bpjs',
            'no_bpjs' => 'required_if:pembayaran,bpjs|string|nullable',
            'poliklinik' => 'required|in:umum,gigi,anak,kandungan',
        ]);

        $pasien = Patient::where('no_nik', $validated['no_nik'])->first();

        if (!$pasien) {
            return back()->withErrors(['no_nik' => 'Data pasien tidak ditemukan.']);
        }
        $pasien->update([
            'nama_pasien' => $validated['nama_pasien'],
            'nama_pendaftar' => $validated['nama_pendaftar'],
            'keluhan_sakit' => $validated['keluhan_sakit'],
            'alamat' => $validated['alamat'],
            'no_telp' => $validated['no_telp'],
            'pembayaran' => $validated['pembayaran'],
            'no_bpjs' => $validated['no_bpjs'] ?? null,
            'poliklinik' => $validated['poliklinik'],
        ]);

        return to_route('pasienDaftar.index')
            ->with('success', "Data pasien lama berhasil diperbarui: {$pasien->nama_pasien}");
    }


    public function search(Request $request)
    {
        $query = $request->query('query');

        $pasien = null;
        if ($query) {
            $pasien = Patient::where('no_nik', $query)
                ->orWhere('no_rm', $query)
                ->first();
        }
        if (!$pasien) {
            return response()->json(['message' => 'Pasien tidak ditemukan'], 404);
        }
        return response()->json([
            'pasien' => [
                'nama_pasien' => $pasien->nama_pasien,
                'no_nik' => $pasien->no_nik,
                'alamat' => $pasien->alamat,
                'no_telp' => $pasien->no_telp,
                'no_rm' => $pasien->no_rm,
                'no_bpjs' => $pasien->no_bpjs,
                'pembayaran' => $pasien->pembayaran,
                'nama_pendaftar' => $pasien->nama_pendaftar
            ]
        ]);
    }
}
