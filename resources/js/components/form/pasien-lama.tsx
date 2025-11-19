/* eslint-disable @typescript-eslint/no-explicit-any */

import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { PatientRegisterRequired, Poliklinik } from '@/types/data';
import { Transition } from '@headlessui/react';
import { useForm, usePage } from '@inertiajs/react';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
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

type PembayaranType = 'umum' | 'bpjs';

type FlashPasienOld = {
    success_pasien_old: string;
    error_pasien_old: string;
};
export default function RegisterPasienLama() {
    const { props } = usePage<{ flash: FlashPasienOld }>();
    const [poli, setPoli] = useState<Poliklinik[]>([]);
    const {
        data,
        setData,
        processing,
        errors,
        recentlySuccessful,
        reset,
        submit,
    } = useForm<Required<PatientRegisterRequired>>({
        nama_pasien: '',
        keluhan_sakit: '',
        no_nik: '',
        alamat: '',
        usia: 0,
        jenis_kelamin: 'P',
        no_telp: '',
        poliklinik_id: 0,
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [pasienFound, setPasienFound] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            toast.warning('Masukkan NIK atau No RM terlebih dahulu');
            return;
        }

        setLoadingSearch(true);

        try {
            const res = await fetch(
                `/pasien-daftar/search?query=${encodeURIComponent(searchQuery)}`,
            );

            if (!res.ok) {
                throw new Error('Data tidak ditemukan');
            }

            const { pasien } = await res.json();

            if (pasien) {
                setData({
                    ...pasien,
                    nama_pasien: pasien.nama_pasien,

                    no_nik: pasien.no_nik,
                    no_telp: pasien.no_telp,
                    alamat: pasien.alamat,
                    no_bpjs: pasien.no_bpjs ?? '',
                    keluhan_sakit: '',
                    pembayaran: '' as PembayaranType,
                    poliklinik_id: pasien.poliklinik_id ?? 0,
                });

                setPasienFound(true);

                toast.success('Pasien ditemukan ', {
                    description: 'Data pasien berhasil dimuat.',
                });
            } else {
                setPasienFound(false);
                reset();
                toast.error('Data tidak ditemukan', {
                    description: 'Pastikan NIK atau No RM benar.',
                    className: 'bg-red-600 text-white',
                });
            }
        } catch (error) {
            console.error(error);
            setPasienFound(false);
            reset();
            toast.error('Data tidak ditemukan', {
                description: 'Pastikan NIK atau No RM benar.',
                className: 'bg-red-600 text-white',
            });
        } finally {
            setLoadingSearch(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(PasienController.indexStep2(), {
            onSuccess: () => {
                reset();
                setPasienFound(false);
                toast.success('Pendaftaran berhasil disimpan 🩺');
            },
        });
    };

    useEffect(() => {
        const fetchPoli = async () => {
            const response = await fetch('/poliklinik');
            const res = await response.json();
            setPoli(res.polikliniks);
        };
        fetchPoli();
    }, []);
    return (
        <div className="mx-auto mb-10 flex max-w-3xl flex-row gap-4">
            <div className="rounded-2xl border p-5 shadow-2xl">
                <HeadingSmall
                    title="Pendaftaran Pasien Lama"
                    description="Isi data berikut untuk mendaftarkan pasien lama"
                />

                {props.flash.success_pasien_old && (
                    <div className="rounded bg-green-100 p-2 text-green-800">
                        {props.flash.success_pasien_old}
                    </div>
                )}
                {props.flash.error_pasien_old && (
                    <div className="rounded bg-green-100 p-2 text-red-800">
                        {props.flash.error_pasien_old}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4 grid grid-cols-1 gap-2">
                        <Label htmlFor="search">Cari Pasien Lama</Label>
                        <div className="flex gap-2">
                            <Input
                                id="search"
                                placeholder="Masukkan No KTP atau No RM"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                disabled={loadingSearch}
                            />
                            <Button
                                type="button"
                                onClick={handleSearch}
                                disabled={loadingSearch}
                                variant="default"
                            >
                                {loadingSearch ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Mencari...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Cari
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {[
                            ['Nomor Rekam Medis', 'no_rm'],
                            ['Nama Pasien', 'nama_pasien'],
                            ['Nomor KTP / NIK', 'no_nik'],
                            ['Nomor Telepon', 'no_telp'],
                        ].map(([label, key]) => (
                            <div key={key} className="grid gap-2">
                                <Label htmlFor={key}>{label}</Label>
                                <Input
                                    id={key}
                                    value={(data as any)[key]}
                                    onChange={(e) =>
                                        setData(
                                            key as keyof PatientRegisterRequired,
                                            e.target.value,
                                        )
                                    }
                                    placeholder={`Masukkan ${label.toLowerCase()}`}
                                    readOnly={pasienFound}
                                    className={
                                        pasienFound
                                            ? 'bg-neutral-100 text-neutral-500'
                                            : ''
                                    }
                                />
                                <InputError message={(errors as any)[key]} />
                            </div>
                        ))}
                        <div className="grid gap-2">
                            <Label htmlFor="usia">Usia</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="usia"
                                    name="usia"
                                    type="number"
                                    value={data.usia ?? ''}
                                    placeholder="Usia pasien"
                                    className="w-24 bg-muted"
                                />
                                <span className="text-sm text-muted-foreground">
                                    Tahun
                                </span>
                            </div>
                            <InputError
                                className="mt-2"
                                message={errors.usia}
                            />
                        </div>

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
                                            setData(
                                                'jenis_kelamin',
                                                e.target.value as 'P' | 'L',
                                            )
                                        }
                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                        required
                                        disabled={pasienFound}
                                    />
                                    <span
                                        className={
                                            pasienFound
                                                ? 'text-neutral-500'
                                                : ''
                                        }
                                    >
                                        Laki-laki
                                    </span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="jenis_kelamin"
                                        value="P"
                                        checked={data.jenis_kelamin === 'P'}
                                        onChange={(e) =>
                                            setData(
                                                'jenis_kelamin',
                                                e.target.value as 'P' | 'L',
                                            )
                                        }
                                        className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                                        disabled={pasienFound}
                                    />
                                    <span
                                        className={
                                            pasienFound
                                                ? 'text-neutral-500'
                                                : ''
                                        }
                                    >
                                        Perempuan
                                    </span>
                                </label>
                            </div>

                            <InputError
                                className="mt-2"
                                message={errors.jenis_kelamin}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="keluhan_sakit">Keluhan Sakit</Label>
                        <Textarea
                            id="keluhan_sakit"
                            value={data.keluhan_sakit}
                            onChange={(e) =>
                                setData('keluhan_sakit', e.target.value)
                            }
                            placeholder="Tuliskan keluhan sakit pasien"
                        />
                        <InputError message={errors.keluhan_sakit} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="alamat">Alamat Saat Ini</Label>
                        <Textarea
                            id="alamat"
                            value={data.alamat}
                            onChange={(e) => setData('alamat', e.target.value)}
                            placeholder="Masukkan alamat lengkap"
                            className={
                                pasienFound
                                    ? 'bg-neutral-100 text-neutral-500'
                                    : ''
                            }
                        />
                        <InputError message={errors.alamat} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="poliklinik">Tujuan Poliklinik</Label>
                        <Select
                            value={
                                data.poliklinik_id
                                    ? data.poliklinik_id.toString()
                                    : ''
                            }
                            onValueChange={(val) =>
                                setData('poliklinik_id', Number(val))
                            }
                            required
                        >
                            <SelectTrigger id="poliklinik">
                                <SelectValue placeholder="Pilih poliklinik" />
                            </SelectTrigger>

                            <SelectContent>
                                {poli.map((row) => (
                                    <SelectItem
                                        key={row.id}
                                        value={row.id.toString()}
                                    >
                                        {row.nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <InputError
                            className="mt-2"
                            message={errors.poliklinik_id}
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <Button disabled={processing || !pasienFound}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                'Daftarkan'
                            )}
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
        </div>
    );
}
