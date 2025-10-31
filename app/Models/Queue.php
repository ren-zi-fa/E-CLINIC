<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Queue extends Model
{
    use HasFactory;
    protected $table = 'visits_queue';
    protected $guarded = [];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($queue) {
            $today = now()->toDateString();
            $last = DB::table('visits_queue')
                ->whereDate('tanggal', $today)
                ->max('nomor_antrian');

            $queue->nomor_antrian = $last ? $last + 1 : 1;

            $queue->tanggal = $today;
        });
    }

    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'poliklinik_id');
    }

    public function pasien()
    {
        return $this->belongsTo(Patient::class, 'pasien_id');
    }
}
