<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        $statuses = ['pending', 'in-progress', 'completed'];

        for ($i = 1; $i <= 20; $i++) {
            DB::table('tasks')->insert([
                'title' => "Sample Task #{$i}",
                'description' => "This is a sample description for Task {$i}.",
                'status' => $statuses[array_rand($statuses)],
                'due_date' => Carbon::now()->addDays(rand(1, 30))->toDateString(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
