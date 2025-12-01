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
        $faker = \Faker\Factory::create('id_ID');
        return [
            'nama_pasien' => $faker->name(),
            'keluhan_sakit' => $faker->sentence(10),
            'usia' => $faker->numberBetween(1, 100),
            'jenis_kelamin' => $faker->randomElement(['L', 'P']),
            'no_rm' => 'RM'.$this->faker->unique()->numerify('####'),
            'no_nik' => $faker->numerify('################'),
            'no_telp' => $faker->numerify('08##########'),
            'alamat' => $faker->address(),
            'pembayaran' => $faker->randomElement(['umum', 'bpjs']),
            'no_bpjs' => function (array $attributes) {
                return $attributes['pembayaran'] === 'bpjs'
                    ? $this->faker->numerify('################')
                    : null;
            },
        ];

    }
}
