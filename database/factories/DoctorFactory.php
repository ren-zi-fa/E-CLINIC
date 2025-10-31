<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    public function definition(): array
    {
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
        $selectedDays = fake()->randomElements($days, rand(2, 4));
        $jadwal = [];

        foreach ($selectedDays as $day) {
            $startHour = fake()->numberBetween(8, 15);
            $startMinute = fake()->randomElement([0, 30]);
            $endHour = $startHour + fake()->numberBetween(3, 4);
            $endMinute = $startMinute;

            $jadwal[$day] = [
                sprintf('%02d:%02d - %02d:%02d', $startHour, $startMinute, $endHour, $endMinute)
            ];
        }

        return [
            'spesialisasi' => fake()->randomElement(['Dokter Umum', 'Gigi', 'Anak', 'THT']),
            'no_sip' => fake()->unique()->bothify('SIP-####-###'),
            'jadwal_praktik' => json_encode($jadwal),
        ];
    }
}

