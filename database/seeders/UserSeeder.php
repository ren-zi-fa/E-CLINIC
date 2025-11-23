<?php

namespace Database\Seeders;

use App\Models\User;
use DateTime;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleAdmin = Role::findByName('admin');
        $roleStaf = Role::findByName('staf');

        // ===================== ADMIN ======================
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Renzi',
                'password' => Hash::make('password'),
                'phone_number' => '01234567890',
                'email_verified_at' => new DateTime,
            ]
        );
        $admin->assignRole($roleAdmin);

        // ===================== STAF ======================
        $userStaf = User::firstOrCreate(
            ['email' => 'staf@example.com'],
            [
                'name' => 'Staf Klinik',
                'password' => Hash::make('password'),
                'phone_number' => '01234567890',
                'email_verified_at' => new DateTime,
            ]
        );
        $userStaf->assignRole($roleStaf);

        $this->command->info('==================User Custom berhasil dibuat.=================');
    }
}
