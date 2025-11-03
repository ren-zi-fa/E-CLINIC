<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Queue extends Model
{

    protected $table = 'visits_queue';
    protected $guarded = [];

    public function poliklinik()
    {
        return $this->belongsTo(Poliklinik::class, 'poliklinik_id');
    }

    public function pasien()
    {
        return $this->belongsTo(Patient::class, 'pasien_id');
    }
}
