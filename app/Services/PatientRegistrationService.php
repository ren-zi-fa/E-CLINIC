<?php

namespace App\Services;

use App\Models\Patient;
use App\Models\Poliklinik;
use App\Models\Queue;
use Illuminate\Support\Facades\DB;

class PatientRegistrationService
{
    public function generateNoRm(): string
    {
        $year = date('Y');
        // Ambil no_rm terakhir di tahun berjalan
       $lastRm = Queue::from('visits_queue as vq')
        ->whereYear('vq.waktu_daftar', $year)
        ->join('patients as p', 'vq.pasien_id', '=', 'p.id')
        ->orderByDesc('vq.id')
        ->value('p.no_rm');



        // Jika ada pasien sebelumnya, ambil nomor terakhir
        $lastNumber = $lastRm ? (int) substr($lastRm, -4) : 0;
        // Tambahkan +1
        $nextNumber = $lastNumber + 1;
        // Format RM-YYYY-XXXX
        return 'RM-' . $year . '-' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
    }
        public function generateAntrian($id_poli): string
        {
            $totalPoli = Poliklinik::count();

            $prefixes = [];
            foreach (range(1, $totalPoli) as $i) {
                $prefixes[$i] = chr(64 + $i); 
            }
            $prefix = $prefixes[$id_poli] ?? 'Z';

            $last = Queue::where('poliklinik_id', $id_poli)
                ->whereDate('tanggal', today())
                ->orderByDesc('id')
                ->first();

            $lastNumber = 0;
            if ($last && preg_match('/-(\d+)$/', $last->nomor_antrian, $matches)) {
                $lastNumber = (int) $matches[1];
            }

            $nextNumber = str_pad($lastNumber + 1, 2, '0', STR_PAD_LEFT);

            return "{$prefix}-{$nextNumber}";
        }


    public function registerNew(array $data): array
    {
        return DB::transaction(function () use ($data) {
        $data['no_rm'] = $this->generateNoRm();
        $patient = Patient::create([
            'alamat'         => $data['alamat'],
            'jenis_kelamin'  => $data['jenis_kelamin'],
            'keluhan_sakit'  => $data['keluhan_sakit'],
            'nama_pasien'    => $data['nama_pasien'],
            'nama_pendaftar' => $data['nama_pendaftar'],
            'no_bpjs'        => $data['no_bpjs'],
            'no_nik'         => $data['no_nik'],
            'no_rm'          => $data['no_rm'],
            'no_telp'        => $data['no_telp'],
            'pembayaran'     => $data['pembayaran'],
            'usia'           => $data['usia'],
          
        ]);

            $queue = Queue::create([
                'pasien_id' => $patient->id,
                'status' => 'menunggu',
                'nomor_antrian' =>$this->generateAntrian($data['poliklinik_id']),
                'tanggal' => now()->toDateString(),
                'poliklinik_id'=>$data['poliklinik_id']
            ]);

            return [
                'no_rm' => $patient->no_rm,
                'nomor_antrian' => $queue->nomor_antrian,
            ];
        });
    }


    public function registerOld(array $data): array
    {
        return DB::transaction(function () use ($data) {

            $patient = Patient::where('no_nik', $data['no_nik'])->firstOrFail();
            $data['no_rm'] = $this->generateNoRm();
            $patient->update([
                'nama_pasien'    => $data['nama_pasien'],
                'nama_pendaftar' => $data['nama_pendaftar'],
                'keluhan_sakit'  => $data['keluhan_sakit'],
                'alamat'         => $data['alamat'],
                'no_telp'        => $data['no_telp'],
                'pembayaran'     => $data['pembayaran'],
                'no_bpjs'        => $data['no_bpjs'] ?? null,
                'jenis_kelamin'  => $data['jenis_kelamin'],
                'usia'           => $data['usia'],
            ]);

            $queue = Queue::create([
                'pasien_id' => $patient->id,
                'status' => 'menunggu',
                'nomor_antrian' =>$this->generateAntrian($data['poliklinik_id']),
                'tanggal' => now()->toDateString(),
                'poliklinik_id'=>$data['poliklinik_id']
            ]);

            return [
                'no_rm' => $patient->no_rm,
                'nomor_antrian' => $queue->nomor_antrian,
            ];
        });
    }
}
