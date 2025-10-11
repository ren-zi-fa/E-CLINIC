<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{



    protected $table = 'visits';
    protected $guarded = [];

    public function patient()
    {
        return $this->belongsTo(Patient::class);
    }
    public function doctor()
    {
        return $this->belongsTo(Doctor::class);
    }
    public function medicalRecord()
    {
        return $this->hasOne(MedicalRecord::class);
    }


    //
}
