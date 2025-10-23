<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;
    protected $table = 'patients';
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


    public function antrian()
    {
        return $this->hasMany(Queue::class, 'pasien_id');
    }
}
