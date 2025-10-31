<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Patient;
use App\Models\Poliklinik;
use App\Models\Queue;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $polikliniks = [
            ["nama" => "Umum", "is_open" => true,],
            ["nama" => "Gigi", "is_open" => true,],
            ["nama" => "THT", "is_open" => true],
            ["nama" => "Konseling", "is_open" => true],
            ["nama" => "KIA / Kebidanan", "is_open" => true,]
        ];

        foreach ($polikliniks as $poli) {
            Poliklinik::insert($poli);
        }
        $patients = Patient::factory()->count(80)->create();

        Queue::factory()
            ->count(100)
            ->recycle($patients)
            ->create();

        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
        ]);
    }
}
