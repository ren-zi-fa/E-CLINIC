import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import HeadingSmall from '../heading-small';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { useEffect, useState } from 'react';
import { Poliklinik } from '@/types/data';
type PembayaranType = 'umum' | 'bpjs';


type RegisterPasien = {
    no_nik: string;
    nama_pasien: string;
    nama_pendaftar: string;
    keluhan_sakit: string;
    alamat: string;
    no_bpjs?: string | null;
    no_telp: string;
    pembayaran: PembayaranType;
    poliklinik_id: number;
    jenis_kelamin: string;
    usia: number;
};
type FlashPasienNew = {
    success_pasien_new: string;
    error_pasien_new: string;
};


export default function RegisterPasienBaru() {
    const [poli,setPoli] = useState<Poliklinik[]>([])
    const { props } = usePage<{ flash: FlashPasienNew }>();
    const {
        data,
        setData,
        processing,
        errors,
        recentlySuccessful,
        reset,
        submit,
    } = useForm<Required<RegisterPasien>>({
        nama_pasien: '',
        no_bpjs: '',
        nama_pendaftar: '',
        keluhan_sakit: '',
        no_nik: '',
        usia: 0,
        alamat: '',
        no_telp: '',
        jenis_kelamin: '',
        poliklinik_id:0 ,
        pembayaran: '' as PembayaranType,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        submit(PasienController.storeNew(), {
            onSuccess: () => {
                reset();
            },
        });
    };

    useEffect(()=>{
    const fetchPoli = async()=>{
        const response = await fetch("/poliklinik")
        const res = await response.json()
     setPoli(res.polikliniks)
    }
    fetchPoli()
    },[])

    return (
        <div className="max-w-4x l mx-auto mb-10 space-y-6">
            <HeadingSmall
                title="Pendaftaran Pasien Baru"
                description="Isi data berikut untuk mendaftarkan pasien baru"
            />
            {props.flash.success_pasien_new && (
                <div
                    id="flash-message"
                    className="relative mb-4 rounded bg-green-100 p-3 text-green-800"
                >
                    <span>{props.flash.success_pasien_new}</span>
                    <button
                        type="button"
                        onClick={() =>
                            document.getElementById('flash-message')?.remove()
                        }
                        className="absolute top-2 right-2 rounded p-1 text-green-700 hover:bg-green-200"
                    >
                        ✕
                    </button>
                </div>
            )}
            {props.flash.error_pasien_new && (
                <div
                    id="flash-error"
                    className="relative mb-4 rounded bg-green-100 p-3 text-red-800"
                >
                    <span>{props.flash.error_pasien_new}</span>
                    <button
                        type="button"
                        onClick={() =>
                            document.getElementById('flash-error')?.remove()
                        }
                        className="absolute top-2 right-2 rounded p-1 text-red-700 hover:bg-green-200"
                    >
                        ✕
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label htmlFor="nama_pendaftar">Nama Pendaftar</Label>
                        <Input
                            id="nama_pendaftar"
                            name="nama_pendaftar"
                            value={data.nama_pendaftar}
                            onChange={(e) =>
                                setData('nama_pendaftar', e.target.value)
                            }
                            placeholder="Masukkan nama pendaftar"
                            required
                        />
                        <InputError
                            className="mt-2"
                            message={errors.nama_pendaftar}
                        />
                    </div>

                    {/* Nama Pasien */}
                    <div className="grid gap-2">
                        <Label htmlFor="nama_pasien">Nama Pasien</Label>
                        <Input
                            id="nama_pasien"
                            name="nama_pasien"
                            value={data.nama_pasien}
                            onChange={(e) =>
                                setData('nama_pasien', e.target.value)
                            }
                            placeholder="Masukkan nama pasien"
                            required
                        />
                        <InputError
                            className="mt-2"
                            message={errors.nama_pasien}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="usia">Usia</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="usia"
                                name="usia"
                                type="number"
                                value={data.usia}
                                onChange={(e) =>
                                    setData('usia', Number(e.target.value))
                                }
                                placeholder="Masukkan usia pasien"
                                min={0}
                                max={120}
                                required
                                className="w-24"
                            />
                            <span className="text-sm text-muted-foreground">
                                Tahun
                            </span>
                        </div>
                        <InputError className="mt-2" message={errors.usia} />
                    </div>

                    {/* jenis kelamin */}
                    <div className="grid gap-2">
                        <Label>Jenis Kelamin</Label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="jenis_kelamin"
                                    value="L"
                                    checked={data.jenis_kelamin === 'L'}
                                    onChange={(e) =>
                                        setData('jenis_kelamin', e.target.value)
                                    }
                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                    required
                                />
                                <span>Laki-laki</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="jenis_kelamin"
                                    value="P"
                                    checked={data.jenis_kelamin === 'P'}
                                    onChange={(e) =>
                                        setData('jenis_kelamin', e.target.value)
                                    }
                                    className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                />
                                <span>Perempuan</span>
                            </label>
                        </div>

                        <InputError
                            className="mt-2"
                            message={errors.jenis_kelamin}
                        />
                    </div>

                    {/* Nomor NIK */}
                    <div className="grid gap-2">
                        <Label htmlFor="no_nik">Nomor KTP/ NIK Pasien</Label>
                        <Input
                            id="no_nik"
                            name="no_nik"
                            value={data.no_nik}
                            onChange={(e) => setData('no_nik', e.target.value)}
                            placeholder="Masukkan nomor KTP"
                            required
                        />
                        <InputError className="mt-2" message={errors.no_nik} />
                    </div>

                    {/* Nomor Telepon */}
                    <div className="grid gap-2">
                        <Label htmlFor="no_telp">Nomor Telepon</Label>
                        <Input
                            id="no_telp"
                            name="no_telp"
                            value={data.no_telp}
                            onChange={(e) => setData('no_telp', e.target.value)}
                            placeholder="08xxxxxxxxxx"
                            required
                        />
                        <InputError className="mt-2" message={errors.no_telp} />
                    </div>

                    {/* Poliklinik */}

                   <div className="grid gap-2">
                    <Label htmlFor="poliklinik">Tujuan Poliklinik</Label>
                    <Select
                        value={data.poliklinik_id ? data.poliklinik_id.toString() : ""}
                        onValueChange={(val) => setData("poliklinik_id", Number(val))}
                        required
                    >
                        <SelectTrigger id="poliklinik">
                        <SelectValue placeholder="Pilih poliklinik" />
                        </SelectTrigger>

                        <SelectContent>
                        {poli.map((row) => (
                            <SelectItem key={row.id} value={row.id.toString()}>
                            {row.nama}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>

                    <InputError className="mt-2" message={errors.poliklinik_id} />
                    </div>


                    {/* Pembayaran */}
                    <div className="grid gap-2">
                        <Label htmlFor="pembayaran">Pembayaran</Label>
                        <Select
                            value={data.pembayaran}
                            onValueChange={(val) =>
                                setData('pembayaran', val as PembayaranType)
                            }
                            required
                        >
                            <SelectTrigger id="pembayaran">
                                <SelectValue placeholder="Pilih jenis pembayaran" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="umum">Umum</SelectItem>
                                <SelectItem value="bpjs">BPJS</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError
                            className="mt-2"
                            message={errors.pembayaran}
                        />
                    </div>
                </div>

                {/* Full width fields */}
                <div className="grid gap-2">
                    <Label htmlFor="keluhan_sakit">Keluhan Sakit</Label>
                    <Textarea
                        id="keluhan_sakit"
                        name="keluhan_sakit"
                        value={data.keluhan_sakit}
                        onChange={(e) =>
                            setData('keluhan_sakit', e.target.value)
                        }
                        placeholder="Keluhan Sakit"
                        required
                    />
                    <InputError
                        className="mt-2"
                        message={errors.keluhan_sakit}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="alamat">Alamat Saat Ini</Label>
                    <Textarea
                        id="alamat"
                        name="alamat"
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        placeholder="Masukkan alamat lengkap"
                        required
                    />
                    <InputError className="mt-2" message={errors.alamat} />
                </div>

                {/* BPJS */}
                {data.pembayaran === 'bpjs' && (
                    <div className="grid gap-2 duration-200 animate-in fade-in">
                        <Label htmlFor="no_bpjs">Nomor BPJS</Label>
                        <Input
                            id="no_bpjs"
                            type="text"
                            placeholder="Masukkan nomor BPJS"
                            value={data.no_bpjs ?? ''}
                            onChange={(e) =>
                                setData('no_bpjs', e.target.value || null)
                            }
                            required={data.pembayaran === 'bpjs'}
                        />
                        <InputError className="mt-2" message={errors.no_bpjs} />
                    </div>
                )}

                {/* Submit */}
                <div className="flex items-center gap-4">
                    <Button disabled={processing}>
                        {processing ? 'Menyimpan...' : 'Daftarkan'}
                    </Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">
                            Data tersimpan
                        </p>
                    </Transition>
                </div>
            </form>
        </div>
    );
}
