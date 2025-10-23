<?php

namespace App\Services;

use App\Models\Patient;
use App\Models\Queue;
use Illuminate\Support\Facades\DB;

class PatientRegistrationService
{

    public function registerNew(array $data): array
    {
        return DB::transaction(function () use ($data) {

            $lastNoRm = Patient::whereYear('waktu_daftar', date('Y'))->max('no_rm');
            $number = $lastNoRm ? ((int) substr($lastNoRm, -4)) + 1 : 1;

            $nextNoRm = 'RM-' . date('Y') . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
            $data['no_rm'] = $nextNoRm;


            $patient = Patient::create($data);
            $queue = Queue::create([
                'pasien_id' => $patient->id,
                'status' => 'menunggu',
            ]);

            return [
                'patient' => $patient,
                'queue' => $queue,
                'no_rm' => $nextNoRm,
                'nomor_antrian' => $queue->nomor_antrian,
            ];
        });
    }


    public function registerOld(array $data): array
    {
        return DB::transaction(function () use ($data) {

            $patient = Patient::where('no_nik', $data['no_nik'])->firstOrFail();

            $patient->update([
                'nama_pasien'    => $data['nama_pasien'],
                'nama_pendaftar' => $data['nama_pendaftar'],
                'keluhan_sakit'  => $data['keluhan_sakit'],
                'alamat'         => $data['alamat'],
                'no_telp'        => $data['no_telp'],
                'pembayaran'     => $data['pembayaran'],
                'no_bpjs'        => $data['no_bpjs'] ?? null,
                'poliklinik'     => $data['poliklinik'],
                'jenis_kelamin'  => $data['jenis_kelamin'],
                'usia'           => $data['usia'],
            ]);

            $queue = Queue::create([
                'pasien_id' => $patient->id,
                'status' => 'menunggu',
            ]);

            return [
                'patient' => $patient,
                'queue' => $queue,
                'no_rm' => $patient->no_rm,
                'nomor_antrian' => $queue->nomor_antrian,
            ];
        });
    }
}
