<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolePermissionSeeder::class,
            UserSeeder::class,
        ]);

        $rolePasien = Role::findByName('pasien');
        $roleDokter = Role::findByName('dokter');
        $roleStaf = Role::findByName('staf');

        // pasien
        for ($i = 0; $i < 50; $i++) {
            $user = User::factory()->create();
            $user->assignRole($rolePasien);

            Patient::factory()->create([
                'user_id' => $user->id,
            ]);
        }
        // dokter
        for ($i = 0; $i < 10; $i++) {
            $user = User::factory()->create();
            $user->assignRole($roleDokter);

            Doctor::factory()->create([
                'user_id' => $user->id,
            ]);
        }

        // stafff
        for ($i = 0; $i < 3; $i++) {
            $user = User::factory()->create();
            $user->assignRole($roleStaf);
        }

        $this->command->info('✅ Role, Permission, dan Data Awal berhasil dibuat.');
    }
}
