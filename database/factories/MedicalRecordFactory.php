<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\MedicalRecord;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MedicalRecord>
 */
class MedicalRecordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = MedicalRecord::class;

    public function definition(): array
    {

        $visit = Visit::doesntHave('medicalRecord')->inRandomOrder()->first();
        if (!$visit) {
            $visit = Visit::factory()->create();
        }
        return [
            'visit_id' => $visit->id,
            'keluhan' => $this->faker->sentence(6),
            'tanda_vital' => json_encode([
                'tekanan_darah' => $this->faker->numerify('12#/#'),
                'detak_jantung' => $this->faker->numberBetween(60, 100),
                'suhu' => $this->faker->randomFloat(1, 36, 38),
            ]),
            'diagnosis' => $this->faker->sentence(8),
            'tindakan' => $this->faker->sentence(10),
            'dokter_id' => $visit->doctor_id ?? Doctor::factory(),
        ];
    }
}
