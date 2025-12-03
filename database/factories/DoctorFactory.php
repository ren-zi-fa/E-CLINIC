<?php

namespace Database\Factories;

use App\Models\Poliklinik;
use Illuminate\Database\Eloquent\Factories\Factory;

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

        // Hari tersedia
        $days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu', 'minggu'];

        // Pilih hari secara acak
        $selectedDays = fake()->randomElements($days, rand(2, 4));

        // Slot waktu tetap (sesuai permintaan)
        $slots = '08:00 - 17:00';
        $jadwal = [];

        // Isi hari yang terpilih dengan slot waktu
        foreach ($selectedDays as $day) {
            $jadwal[$day] = $slots;
        }

        // Hari yang tidak dipilih tetap "-"
        foreach ($days as $day) {
            if (! isset($jadwal[$day])) {
                $jadwal[$day] = '-';
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
