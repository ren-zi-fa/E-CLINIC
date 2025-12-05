<?php

namespace App\Http\Controllers\Dokter;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\User;
use App\Utils\FormatterCostum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;

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
            ->join('polikliniks', 'doctors.poliklinik_id', '=', 'polikliniks.id')
            ->select(
                'doctors.id',
                'doctors.no_sip',
                'doctors.spesialisasi',
                'users.name',
                'polikliniks.nama as nama_poliklinik'
            )
            ->orderBy('polikliniks.nama')
            ->get();

        return Inertia::render('manage-dokter/manage-dokter', [
            'poli_list' => $poli,
            'dokters' => $dokters,
        ]);
    }

    public function tambah(){
        return Inertia::render('manage-dokter/tambah-dokter');
    }
    
public function insert(Request $request)
{
    $payload = $request->validate([
        'name' => 'required|string|max:255',
        'spesialisasi' => 'required|string|max:255',
        'poliklinik_id' => 'required|integer|exists:polikliniks,id',
        'no_sip' => 'required|string|max:255',
        'jadwal_praktik' => 'required|array',
        'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
    ]);

    DB::transaction(function () use ($payload) {
        $user = User::create([
            'name' => $payload['name'],
            'password' =>Hash::make($payload['password']), 
            'email'=>$payload['email']
        ]);

        Doctor::create([
            'user_id' => $user->id,
            'spesialisasi' => $payload['spesialisasi'],
            'poliklinik_id' => $payload['poliklinik_id'],
            'no_sip' => $payload['no_sip'],
            'jadwal_praktik' => json_encode($payload['jadwal_praktik']),
        ]);
    });
    return redirect()->route('manage_dokter.index')->with('success', 'Dokter berhasil ditambahkan');
}

    public function edit(Request $request, $idDokter)
    {
        $user = DB::table('doctors')
            ->join('users', 'doctors.user_id', '=', 'users.id')
            ->join('polikliniks','doctors.poliklinik_id','=','polikliniks.id')
            ->select(
                'doctors.id',
                'users.name',
                'doctors.no_sip',
                'doctors.jadwal_praktik',
                'doctors.spesialisasi',
                'polikliniks.nama as nama_poliklinik',
                'polikliniks.id as poliklinik_id',  
            )
            ->where('doctors.id', $idDokter)
            ->first();

        if (!$user) {
            abort(404, 'Dokter tidak ditemukan');
        }

        $jadwal = json_decode($user->jadwal_praktik, true);
        $user->jadwal_praktik = FormatterCostum::flatten($jadwal);

        $polikliniks = DB::table('polikliniks')->select('nama')->get();

        return Inertia::render('manage-dokter/edit-dokter', [
            'dokter' => $user,
            'polikliniks' => $polikliniks,
        ]);

    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'no_sip' => 'required|string|max:255|unique:doctors,no_sip,'.$id,
            'spesialisasi' => 'required|string|max:255',
            'jadwal_praktik' => 'required',
            'poliklinik_id' => 'required',
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
                'poliklinik_id' => $validated['poliklinik_id'],
            ]);

            return to_route('manage_dokter.index')->with('success', 'dokter berhasil di update');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Gagal memperbarui data dokter: '.$e->getMessage());
        }
    }


   public function search(Request $request)
{
    $query = $request->query('search');

    if (! $query) {
        return response()->json(['message' => 'parameter search kosong'], 400);
    }

    $dokter = DB::table('doctors')
        ->join('users', 'doctors.user_id', '=', 'users.id')
        ->join('polikliniks', 'doctors.poliklinik_id', '=', 'polikliniks.id')
        ->select(
            'doctors.id',
            'doctors.no_sip',
            'doctors.spesialisasi',
            'users.name',
            'polikliniks.nama as nama_poliklinik'
        )
        ->where('users.name', 'LIKE', "%{$query}%")
        ->orWhere('doctors.no_sip', 'LIKE', "%{$query}%")
        ->orWhere('doctors.spesialisasi', 'LIKE', "%{$query}%")
        ->first();

    if (! $dokter) {
        return response()->json(['message' => 'dokter tidak ditemukan'], 404);
    }

    return response()->json([
        'dokter' => $dokter,
    ]);
}

     public function destroy(Doctor $dokter)
     {
            $dokter->delete();

            return redirect()->back()->with([
                'success' => 'Dokter deleted',
                'success_time' => now()->timestamp,
            ]);

     }

     public function show($id)
     {
         $dokters = DB::table('doctors')
            ->join('users', 'doctors.user_id', '=', 'users.id')
            ->join('polikliniks', 'doctors.poliklinik_id', '=', 'polikliniks.id')
            ->select(
                'doctors.id',
                'doctors.no_sip',
                'doctors.spesialisasi',
                'users.name',
                'polikliniks.nama as nama_poliklinik'
            )
            ->where('doctors.user_id','=',$id)->first();
            return response()->json([
                    'data' => $dokters,
                ]);
     }


}
