<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Models\Doctor;
use App\Models\Patient;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        /**
         *role staf => view-pasien,create-pasien,edit-pasien,create-antrian (berikan no antrian)
         *
         * role
         *
         * */
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view patients',
            'create patients',
            'edit patients',
            'delete patients',

            'view doctors',
            'create doctors',
            'edit doctors',
            'delete doctors',

            'view visits',
            'create visits',
            'edit visits',
            'delete visits',

            'view medical records',
            'create medical records',
            'edit medical records',

            'view prescriptions',
            'create prescriptions',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        $adminRole =  Role::firstOrCreate(['name' => 'admin']);
        $roleStaf   = Role::firstOrCreate(['name' => 'staf']);
        $roleDokter = Role::firstOrCreate(['name' => 'dokter']);
        $rolePasien = Role::firstOrCreate(['name' => 'pasien']);

        $adminRole->syncPermissions($permissions);

        $rolePasien->givePermissionTo([
            'view visits',
            'create visits',
            'view prescriptions',
        ]);
        $roleDokter->givePermissionTo([
            'view patients',
            'view visits',
            'create medical records',
            'edit medical records',
            'view prescriptions',
        ]);

        $roleStaf->givePermissionTo([
            'view patients',
            'create patients',
            'edit patients',
            'view doctors',
            'view visits',
            'create visits',
            'edit visits',
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
        $this->command->info('==========Role, Permission, dan Data Awal berhasil dibuat.===========');
    }
}
