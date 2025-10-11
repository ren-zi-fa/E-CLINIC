<?php

namespace Database\Factories;

use App\Models\MedicalRecord;
use App\Models\Prescription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Prescription>
 */
class PrescriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */


    protected $model = Prescription::class;
    public function definition(): array
    {
        $medicalRecord = MedicalRecord::inRandomOrder()->first();
        if (!$medicalRecord) {
            $medicalRecord = MedicalRecord::factory()->create();
        }

        return [
            'medical_record_id' => $medicalRecord->id,
            'nama_obat' => $this->faker->word() . ' ' . $this->faker->randomElement(['Sirup', 'Tablet', 'Kapsul']),
            'dosis' => $this->faker->randomElement(['1x sehari', '2x sehari', '3x sehari']),
            'keterangan' => $this->faker->sentence(6),
            'status' => $this->faker->randomElement(['menunggu', 'diambil', 'selesai']),
        ];
    }
}
