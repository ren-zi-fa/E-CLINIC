<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;
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
        $rolePasien = Role::findByName('pasien');
        $roleDokter = Role::findByName('dokter');
        $roleStaf = Role::findByName('staf');
        
        // pasien
        $userPasien = User::firstOrCreate([
            'email' => 'budi@example.com',
        ], [
            'name' => 'Budi Santoso',
            'password' => Hash::make('password'),
            'phone_number' => '01234567890'
        ]);
        $userPasien->assignRole($rolePasien);

        Patient::firstOrCreate([
            'user_id' => $userPasien->id,
        ], [
            'no_rm' => 'RM001',
            'nik' => '3210987654321001',
            'tanggal_lahir' => '1990-05-10',
            'jenis_kelamin' => 'L',
            'alamat' => 'Jl. Melati No. 10',

        ]);

        // dokter
        $userDokter = User::firstOrCreate([
            'email' => 'dr.sari@example.com',
        ], [
            'name' => 'Dr. Sari Putri',
            'password' => Hash::make('password'),
            'phone_number' => '01234567890'
        ]);
        $userDokter->assignRole($roleDokter);

        Doctor::firstOrCreate([
            'user_id' => $userDokter->id,
        ], [
            'spesialisasi' => 'Dokter Umum',
            'no_sip' => 'SIP-2025-001',
            'jadwal_praktik' => json_encode([
                'Senin' => ['08:00 - 12:00'],
                'Rabu'  => ['13:00 - 17:00'],
                'Jumat' => ['08:00 - 12:00'],
            ]),
        ]);


        // stafff
        $userStaf = User::firstOrCreate([
            'email' => 'staf@example.com',
        ], [
            'name' => 'Staf Klinik',
            'password' => Hash::make('password'),
            'phone_number' => '01234567890'
        ]);
        $userStaf->assignRole($roleStaf);
    }
}
