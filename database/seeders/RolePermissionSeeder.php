<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

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

        $rolePasien = Role::firstOrCreate(['name' => 'pasien']);
        $roleDokter = Role::firstOrCreate(['name' => 'dokter']);
        $roleStaf   = Role::firstOrCreate(['name' => 'staf']);

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
    }
}
