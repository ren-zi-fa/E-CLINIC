<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

use App\Models\Doctor;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        /**
         *r
         *
         * remove cache
         *
         * */
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'view doctors',
            'create doctors',
            'edit doctors',
            'delete doctors',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        $adminRole =  Role::firstOrCreate(['name' => 'admin']);
        $roleStaf   = Role::firstOrCreate(['name' => 'staf']);
        $roleDokter = Role::firstOrCreate(['name' => 'dokter']);

        $adminRole->syncPermissions($permissions);
        $roleDokter->givePermissionTo([
            'create medical records',
            'edit medical records',
            'view prescriptions',
        ]);

        $roleStaf->givePermissionTo([
            'view doctors',
            'create visits',
            'edit visits',
        ]);
        $roleDokter = Role::findByName('dokter');
        $roleStaf = Role::findByName('staf');

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
