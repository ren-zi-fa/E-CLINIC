<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Poliklinik;
use App\Models\User;
use DateTime;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
        $roleDokter = Role::findByName('dokter');

        // ===================== ADMIN ======================
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Renzi',
                'password' => Hash::make('password'),
                'phone_number' => '01234567890',
                'email_verified_at' => new DateTime()
            ]
        );
        $admin->assignRole($roleAdmin);

        // ===================== DOKTER =====================
        $userDokter = User::firstOrCreate(
            ['email' => 'dr.sari@example.com'],
            [
                'name' => 'Dr. Sari Putri',
                'password' => Hash::make('password'),
                'phone_number' => '01234567890',
                'email_verified_at' => new DateTime()
            ]
        );
        $userDokter->assignRole($roleDokter);

        // Ambil poliklinik "Umum" → id = 1
        $poliUmum = Poliklinik::where('nama', 'Umum')->first();

        Doctor::firstOrCreate(
            ['user_id' => $userDokter->id],
            [
                'poliklinik_id' => $poliUmum->id,  
                'spesialisasi' => 'Dokter Umum',
                'no_sip' => 'SIP-2025-001',
                'jadwal_praktik' => json_encode([
                    'Senin' => ['08:00 - 12:00'],
                    'Rabu'  => ['13:00 - 17:00'],
                    'Jumat' => ['08:00 - 12:00'],
                ]),
            ]
        );

        // ===================== STAF ======================
        $userStaf = User::firstOrCreate(
            ['email' => 'staf@example.com'],
            [
                'name' => 'Staf Klinik',
                'password' => Hash::make('password'),
                'phone_number' => '01234567890',
                'email_verified_at' => new DateTime()
            ]
        );
        $userStaf->assignRole($roleStaf);

        $this->command->info('==================User Custom berhasil dibuat.=================');
    }
}
