<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama_pasien' => $this->faker->name(),
            'nama_pendaftar' => $this->faker->name(),
            'keluhan_sakit' => $this->faker->sentence(10),
            'usia' => $this->faker->numberBetween(1, 100),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'no_rm' => 'RM' . $this->faker->unique()->numerify('####'),
            'no_nik' => $this->faker->optional()->numerify('################'),
            'no_telp' => $this->faker->optional()->numerify('08##########'),
            'alamat' => $this->faker->optional()->address(),
            'pembayaran' => $this->faker->randomElement(['umum', 'bpjs']),
            'no_bpjs' => function (array $attributes) {
                return $attributes['pembayaran'] === 'bpjs'
                    ? $this->faker->numerify('################')
                    : null;
            },
            'waktu_daftar' => $this->faker->dateTimeBetween('-1 month', 'now'),
        ];

    }
}
