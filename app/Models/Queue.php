<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Queue extends Model
{

    protected $table = 'visits_queue';
    protected $guarded = [];
    public $timestamps = false;

    protected static function boot()
    {
        parent::boot();

    static::creating(function ($model) {
            if (empty($model->waktu_daftar)) {
                $model->waktu_daftar = now();
            }
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
