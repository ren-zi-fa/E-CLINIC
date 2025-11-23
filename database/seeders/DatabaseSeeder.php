<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Patient;
use App\Models\Poliklinik;
use App\Models\Queue;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
    */
    public function run(): void
    {
 
        $polikliniks = [
            ["nama" => "Umum", "kode" => "A", "is_open" => true,],
            ["nama" => "Gigi", "kode" => "B", "is_open" => true,],
            ["nama" => "THT", "kode" => "C", "is_open" => true],
            ["nama" => "Konseling", "kode" => "D", "is_open" => true],
            ["nama" => "KIA-Kebidanan", "kode" => "E", "is_open" => false,]
        ];

        foreach ($polikliniks as $poli) {
            Poliklinik::insert($poli);
        }
        $allPolikliniks = Poliklinik::all();

        // 3. Buat 100 pasien
        $patients = Patient::factory()->count(100)->create();

        // 4. Generate antrian
        foreach ($allPolikliniks as $poli) {
            // Ambil 20 pasien per poliklinik
            $patientsForPoli = $patients->splice(0, 20);

            foreach ($patientsForPoli as $index => $patient) {
                $nomorAntrian = sprintf("%s-%02d", $poli->kode, $index + 1);
                Queue::create([
                    'pasien_id' => $patient->id,
                    'poliklinik_id' => $poli->id,
                    'nomor_antrian' => $nomorAntrian,
                    'status' => 'menunggu',
                    'tanggal' => now()->toDateString(),
                    'waktu_daftar' => now(),
                ]);
                
            }
        }
        
        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
        ]);
    }
}
