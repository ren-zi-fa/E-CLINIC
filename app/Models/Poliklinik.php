<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Poliklinik extends Model
{
    use HasFactory;
    protected $guarded = [];

    public $timestamps = false;

    public function visits()
    {
        return $this->hasMany(Queue::class, 'poliklinik_id');
    }

    public function doctors()
    {
        return $this->hasMany(Doctor::class);
    }
}
