<?php

namespace Database\Factories;

use App\Models\Poliklinik;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    public function definition(): array
    {
        $mapping = [
            1 => ['Dokter Umum'],
            2 => ['Dokter Gigi'],
            3 => ['Dokter THT'],
            4 => ['Konselor', 'Psikolog'],
            5 => ['Bidan', 'Dokter Kandungan'],
        ];

        $poliklinik = Poliklinik::inRandomOrder()->first();
        $spesialis = fake()->randomElement($mapping[$poliklinik->id]);

        $days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];
        $selectedDays = fake()->randomElements($days, rand(2, 4));

        $jadwal = [];

        foreach ($selectedDays as $day) {

            // Mode random: normal atau malam
            $mode = fake()->randomElement(['normal', 'malam']);

            if ($mode === 'malam') {
                // Jam 01:00 – 06:00
                $startHour = fake()->numberBetween(1, 3);   // mulai 01–03
                $startMinute = fake()->randomElement([0, 30]);
                $endHour = fake()->numberBetween($startHour + 1, 6); // selesai sampai 06
                $endMinute = $startMinute;
            } else {
                // Jam normal 07:00 – 18:00
                $startHour = fake()->numberBetween(7, 14);
                $startMinute = fake()->randomElement([0, 30]);

                $duration = fake()->numberBetween(2, 4);
                $endHour = $startHour + $duration;
                $endMinute = $startMinute;
            }

            $jadwal[$day] = [
                sprintf(
                    '%02d:%02d - %02d:%02d',
                    $startHour,
                    $startMinute,
                    $endHour,
                    $endMinute
                ),
            ];
        }

        foreach ($days as $day) {
            if (! isset($jadwal[$day])) {
                $jadwal[$day] = ['-'];
            }
        }

        return [
            'poliklinik_id' => $poliklinik->id,
            'spesialisasi' => $spesialis,
            'no_sip' => fake()->unique()->bothify('SIP-####-###'),
            'jadwal_praktik' => json_encode($jadwal),
        ];
    }
}
