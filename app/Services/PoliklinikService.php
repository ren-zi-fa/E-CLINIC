<?php

namespace App\Services;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class PoliklinikService
{
    public function getLiveMonitor()
{
    $startOfDay = now()->startOfDay();
    $endOfDay = now()->endOfDay();

    $rawData = DB::table('polikliniks')
            ->leftJoin('doctors', 'doctors.poliklinik_id', '=', 'polikliniks.id')
            ->leftJoin('users', 'users.id', '=', 'doctors.user_id')
            ->leftJoin('visits_queue', function ($join) use ($startOfDay, $endOfDay) {
                $join->on('visits_queue.poliklinik_id', '=', 'polikliniks.id')
                    ->whereBetween('visits_queue.waktu_daftar', [$startOfDay, $endOfDay]);
            })
            ->select(
                'polikliniks.id',
                'polikliniks.nama',
                'polikliniks.is_open',
                'doctors.id as doctor_id',
                'doctors.spesialisasi',
                'doctors.jadwal_praktik',
                'users.name as nama_doktor',
                'users.phone_number as nomor_hp_doktor',
                DB::raw('COUNT(visits_queue.id) as total_antrian')
            )
            ->groupBy(
                'polikliniks.id',
                'polikliniks.nama',
                'polikliniks.is_open',
                'doctors.id',
                'doctors.spesialisasi',
                'doctors.jadwal_praktik',
                'users.name',
                'users.phone_number'
            )
            ->get();

    $hari = strtolower(now()->locale('id')->dayName);
    $now = now();
        
    $filtered = $rawData->filter(function ($item) use ($hari, $now) {
           
            if (! $item->doctor_id) {
                return false;
            }

            $jadwal = json_decode($item->jadwal_praktik, true);

            if (! $jadwal || ! isset($jadwal[$hari])) {
                return false;
            }

            $range = $jadwal[$hari];  // string seperti "08:00 - 17:00" atau "-"

            if ($range === '-' || trim($range) === '') {
                return false;
            }

            // parse
            [$start, $end] = array_map('trim', explode('-', $range));

            $startTime = Carbon::parse($start);
            $endTime = Carbon::parse($end);

            return $now->between($startTime, $endTime);
    });
        return $filtered->map(function ($item) {
            if (! $item->is_open) {
                $item->status = 'TUTUP';
            } elseif ($item->total_antrian >= 15) {
                $item->status = 'PENUH';
            } else {
                $item->status = 'BUKA';
            }

            return $item;
        })->values();
    }
}
