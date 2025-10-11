<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    //
    use HasFactory;
    protected $table = 'prescriptions';
    protected $guarded = [];

    public function medical_record()
    {
        return $this->belongsTo(MedicalRecord::class);
    }
}
