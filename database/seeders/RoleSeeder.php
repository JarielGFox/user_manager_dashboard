<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get roles from the config file (config/roles.php)
        $rolesConfig = config('roles');

        // Loop through each role in the config and insert/update it in the database.
        foreach ($rolesConfig as $key => $value) {
            Role::updateOrCreate(
                ['id' => $value], // Ensure your roles table can accept these IDs
                ['name' => ucwords($key)]
            );
        }
    }
}
