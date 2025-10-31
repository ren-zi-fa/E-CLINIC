<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Queue>
 */
class QueueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pasien_id' => Patient::inRandomOrder()->first()?->id ?? Patient::factory(),
            'poliklinik_id' => $this->faker->randomElement([1, 2, 3]),
            'nomor_antrian' => $this->faker->unique()->numberBetween(1, 200),
            'status' => $this->faker->randomElement(['menunggu', 'proses', 'selesai']),
            'tanggal' => $this->faker->dateTimeBetween('-1 week', 'now')->format('Y-m-d'),
        ];
    }
}
