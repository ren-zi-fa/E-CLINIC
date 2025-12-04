<?php

namespace App\Http\Controllers\Pasien;

use App\Http\Controllers\Controller;
use App\Models\Patient;
use App\Models\Poliklinik;
use App\Services\PatientRegistrationService;
use App\Services\PatientService;
use App\Services\PoliklinikService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PasienController extends Controller
{
    protected $registrationService;

    protected $patientService;

    protected $poliklinikService;

    public function __construct(PatientRegistrationService $registrationService, PoliklinikService $poliklinikService, PatientService $patientService)
    {
        $this->registrationService = $registrationService;
        $this->poliklinikService = $poliklinikService;
        $this->patientService = $patientService;

    }

    public function index()
    {
        $dataMonitor = $this->poliklinikService->getLiveMonitor();

        return Inertia::render('pendaftaran-pasien/pendaftaran', [
            'data_monitor' => $dataMonitor,
        ]);
    }

    public function indexManagepasien(Request $request)
    {
        $result = $this->patientService->getPaginatedPatients($request);

        return Inertia::render('manage-pasien/manage-pasien', [
            'data' => $result['patients'],
            'stats' => $result['stats'],
        ]);
    }

    public function indexStep2()
    {
        $step1Data = session('pendaftaran.step1_data');
        if (! $step1Data) {
            return redirect()->route('pasienDaftar.index');
        }

        return Inertia::render('pendaftaran-pasien/pendaftaranStep2', [
            'step1Data' => $step1Data,
            'step' => 2,
        ]);
    }

    public function indexStep3()
    {
        $step2Data = session('pendaftaran.step2_data');

        $poli = Poliklinik::find($step2Data['poliklinik_id']);

        $nomor_antrian = $this->registrationService->generateAntrian($step2Data['poliklinik_id']);
        $no_rm = $this->registrationService->generateNoRm();

        if (! $step2Data) {
            return redirect()->route('pasienDaftar.index');
        }

        return Inertia::render('pendaftaran-pasien/pendaftaranStep3', [
            'step2Data' => $step2Data,
            'step' => 3,
            'nama_poli' => $poli->nama,
            'nomor_antrian' => $nomor_antrian,
            'no_rm' => $no_rm,
        ]);
    }

    public function handleStep1(Request $request)
    {
        $validatedData = $request->validate([
            'nama_pasien' => 'required|string|max:100',
            'no_nik' => 'required|numeric|unique:patients,no_nik',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'jenis_kelamin' => 'required|in:P,L',
            'usia' => 'required|integer|min:0|max:120',
        ]);

        session()->put('pendaftaran.step1_data', $validatedData);

        return redirect()->route('pasienDaftar.indexstep2');
    }

    public function handleStep1ExistingPatient(Request $request)
    {
        $validatedData = $request->validate([
            'nama_pasien' => 'required|string|max:100',
            'no_nik' => 'required|numeric',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'jenis_kelamin' => 'required|in:P,L',
            'usia' => 'required|integer|min:0|max:120',
        ]);

        session()->put('pendaftaran.step1_data', $validatedData);

        return redirect()->route('pasienDaftar.indexstep2');
    }

    public function handleStep2(Request $request)
    {
        $validatedData = $request->validate([
            'nama_pasien' => 'required|string|max:100',
            'keluhan_sakit' => 'required|string|max:255',
            'no_nik' => 'required|numeric',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'poliklinik_id' => 'required|exists:polikliniks,id',
            'jenis_kelamin' => 'required|in:P,L',
            'usia' => 'required|integer|min:0|max:120',
        ]);
        session()->put('pendaftaran.step2_data', $validatedData);

        return redirect()->route('pasienDaftar.indexstep3');
    }

    public function handleStep3(Request $request)
    {

        $validatedData = $request->validate([
            'nama_pasien' => 'required|string|max:100',
            'keluhan_sakit' => 'required|string|max:255',
            'no_nik' => 'required|numeric',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|max:15',
            'poliklinik_id' => 'required|exists:polikliniks,id',
            'jenis_kelamin' => 'required|in:P,L',
            'usia' => 'required|integer|min:0|max:120',
            'no_rm' => 'required',
            'nomor_antrian' => 'required',
        ]);
        $data = $this->registrationService->registerNew($validatedData);

        return to_route('pasienDaftar.index')
            ->with('success', "Berhasil mencetak antrian dengan nomor antrian {$data['nomor_antrian']} ");
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
        if (! $pasien) {
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
                'jenis_kelamin' => $pasien->jenis_kelamin,
                'usia' => $pasien->usia,
            ],
        ]);

    }
}
