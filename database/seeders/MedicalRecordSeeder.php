<?php

namespace Database\Seeders;

use App\Models\MedicalRecord;
use App\Models\Visit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MedicalRecordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $availableVisits = Visit::doesntHave('medicalRecord')->get();

        if ($availableVisits->count() === 0) {
            $this->command->info(' Tidak ada visit kosong, jalankan VisitSeeder dulu.');
            return;
        }

        $count = min(30, $availableVisits->count());

        for ($i = 0; $i < $count; $i++) {
            $visit = $availableVisits->shift();

            MedicalRecord::factory()->create([
                'visit_id' => $visit->id,
                'dokter_id' => $visit->doctor_id,
            ]);
        }
        $this->command->info('============ 30 MedicalRecord berhasil dibuat.=======');
    }
}
