<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Services\PatientRegistrationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    protected $registrationService;

    public function __construct(PatientRegistrationService $registrationService)
    {
        $this->registrationService = $registrationService;
    }
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
            'no_nik' => 'required|numeric|unique:patients,no_nik',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'pembayaran' => 'required|in:umum,bpjs',
            'no_bpjs' => 'required_if:pembayaran,bpjs|string|nullable',
            'poliklinik_id' => 'required|exists:polikliniks,id',
            'jenis_kelamin' => 'required|in:P,L',
            'usia' => 'required|integer|min:0|max:120',
        ]);

        try {
            $result = $this->registrationService->registerNew($validated);
            $flashMessage = "Pasien baru berhasil disimpan. No.{$result['no_rm']}, {$result['nomor_antrian']}.";

        // Redirect + flash + data pasien baru
           return to_route('pasienDaftar.success', $result['pasien_id'])
            ->with('success_pasien_new', $flashMessage)
            ->with('pasien_print', $result);


            } catch (\Exception $e) {
                return to_route('pasienDaftar.index')
                    ->with('error_pasien_new', 'Gagal menyimpan pasien baru: ' . $e->getMessage());
            }
        }

    public function storeOld(Request $request)
    {
        $validated = $request->validate([
            'nama_pasien' => 'required|string|max:100',
            'nama_pendaftar' => 'required|string|max:100',
            'keluhan_sakit' => 'required|string|max:255',
            'no_nik' => 'required|numeric',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'pembayaran' => 'required|in:umum,bpjs',
            'no_bpjs' => 'required_if:pembayaran,bpjs|string|nullable',
            'poliklinik_id' => 'required|exists:polikliniks,id',
            'jenis_kelamin' => 'required|in:P,L',
            'usia' => 'required|integer|min:0|max:120',
        ]);

        try {
            $result = $this->registrationService->registerOld($validated);

            return to_route('pasienDaftar.index')
                ->with('success_pasien_old', "Pasien lama berhasil diperbarui. No. RM {$result['no_rm']}, Nomor Antrian {$result['nomor_antrian']}.");
        } catch (\Exception $e) {
            return to_route('pasienDaftar.index')
                ->with('error_pasien_old', 'Gagal memperbarui pasien lama: ' . $e->getMessage());
        }
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
                'nama_pendaftar' => $pasien->nama_pendaftar,
                'jenis_kelamin' => $pasien->jenis_kelamin,
                'usia' => $pasien->usia,
            ]
        ]);
    }

    public function success(Request $request, $pasien_id) 
    {
        return Inertia::render("print/index");
    }
}
