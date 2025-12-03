<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;


class DokterController extends Controller
{
    public function indexManageDokter()
    {

        $poli = DB::table('polikliniks')->get()->map(function ($item) {
            $item->is_open = (bool) $item->is_open;

            return $item;
        });
        $dokters = DB::table('doctors')
            ->join('users', 'doctors.user_id', '=', 'users.id')
            ->select(
                'doctors.id',
                'doctors.no_sip',
                'doctors.spesialisasi',
                'users.name'
            )
            ->get();


        return Inertia::render('manage-dokter/manage-dokter', [
            'poli_list' => $poli,
            'dokters'=>$dokters
        ]);
    }
    
public function edit(Request $request, $name)
{
    $user = User::select('id', 'name')
        ->with(['dokter' => function ($q) {
            $q->select('id', 'user_id', 'spesialisasi', 'no_sip', 'poliklinik_id', 'jadwal_praktik');
        }])
        ->where('name', $name)
        ->firstOrFail();

    // Ubah jadwal_praktik array → string
    $jadwal = json_decode($user->dokter->jadwal_praktik, true);

    $flat = [];
    foreach ($jadwal as $day => $value) {
        if (is_array($value)) {
            if (count($value) === 0) {
                $flat[$day] = "-";
            } elseif (count($value) === 1) {
                $flat[$day] = $value[0];
            } else {
                // Gabungkan menjadi satu string
                $flat[$day] = implode(', ', $value);
            }
        } else {
            $flat[$day] = $value;
        }
    }

    // Timpa kembali jadwal hasil transform
    $user->dokter->jadwal_praktik = $flat;  
    $polikliniks = DB::table('polikliniks')->select('nama')->get();
    return Inertia::render('manage-dokter/edit-dokter', [
        'dokter' => $user,
        'polikliniks'=>$polikliniks
    ]);
}

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'no_sip' => 'required|string|max:255|unique:doctors,no_sip,' . $id,
            'spesialisasi' => 'required|string|max:255',
            'jadwal_praktik' => 'required|array',
        ]);
        try {
            $doctor = Doctor::findOrFail($id);
            $doctor->user()->update([
                'name' => $validated['name'],
            ]);
            $doctor->update([
                'no_sip' => $validated['no_sip'],
                'spesialisasi' => $validated['spesialisasi'],
                'jadwal_praktik' => $validated['jadwal_praktik'],
            ]);

            return to_route('manage_dokter.index')->with('success','dokter berhasil di update');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui data dokter: ' . $e->getMessage());
        }
    }
}
