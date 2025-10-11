<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'spesialisasi' => fake()->randomElement(['Dokter Umum', 'Gigi', 'Anak', 'THT']),
            'no_sip' => fake()->unique()->bothify('SIP-####-###'),
            'jadwal_praktik' => json_encode([
                'Senin' => ['08:00 - 12:00'],
                'Rabu'  => ['13:00 - 17:00'],
                'Jumat' => ['08:00 - 12:00'],
            ]),
        ];
    }
}
