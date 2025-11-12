<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('visits_queue', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pasien_id')->constrained('patients')->onDelete('cascade');
            $table->foreignId('poliklinik_id')->constrained('polikliniks')->onDelete('cascade');
            $table->string('nomor_antrian');
            $table->enum('status', ['menunggu', 'proses', 'selesai', 'skip'])->default('menunggu');
            $table->date('tanggal');
            $table->timestamps();

           $table->unique(['poliklinik_id', 'tanggal', 'nomor_antrian']);

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('visits_queue');
    }
};
