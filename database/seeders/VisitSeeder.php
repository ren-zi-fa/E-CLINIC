<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VisitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $patients = Patient::all();
        $doctors = Doctor::all();
        $users = User::all();

        if ($patients->count() === 0 || $doctors->count() === 0 || $users->count() === 0) {
            $this->command->info('???? Pastikan Patient, Doctor, dan User sudah ada.?????');
            return;
        }

        // Buat 50 kunjungan acak
        for ($i = 0; $i < 50; $i++) {
            Visit::factory()->create([
                'patient_id' => $patients->random()->id,
                'doctor_id' => $doctors->random()->id,
                'created_by' => $users->random()->id,
            ]);
        }

        $this->command->info('============50 kunjungan berhasil dibuat.=================');
    }
}
