<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
use App\Models\Visit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Visit>
 */
class VisitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Visit::class;
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'doctor_id' => Doctor::factory(),
            'tanggal_kunjungan' => $this->faker->dateTimeBetween('now', '+30 days'),
            'status' => $this->faker->randomElement(['menunggu', 'diperiksa', 'selesai', 'batal']),
            'nomor_antrian' => $this->faker->unique()->numerify('###'),
            'created_by' => User::factory(),

        ];
    }
}
