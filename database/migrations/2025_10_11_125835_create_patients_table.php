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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('nama_pasien');
            $table->string('nama_pendaftar');
            $table->text('keluhan_sakit');
            $table->unsignedTinyInteger('usia');
            $table->enum('jenis_kelamin', ['L', 'P']);
            $table->string('no_rm')->unique();
            $table->string('no_nik', 16);
            $table->string('no_telp', 15);
            $table->text('alamat');
            $table->enum('pembayaran', ['umum', 'bpjs']);
            $table->string('no_bpjs')->nullable();
            $table->timestamp('waktu_daftar');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
