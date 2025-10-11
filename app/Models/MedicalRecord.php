<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    //
    use HasFactory;
    protected $table = 'medical_records';
    protected $guarded = [];

    public function visit()
    {
        return $this->belongsTo(Visit::class);
    }
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
    public function prescription()
    {
        return $this->hasOne(Prescription::class);
    }
}
