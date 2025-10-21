import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
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

type PoliklinikType = 'umum' | 'gigi' | 'anak' | 'mata' | 'tht';
type RegisterPasien = {
    no_nik: string;
    nama_pasien: string;
    nama_pendaftar: string;
    keluhan_sakit: string;
    alamat: string;
    no_bpjs?: string | null;
    no_telp: string;
    pembayaran: PembayaranType;
    poliklinik: PoliklinikType;
};
export default function RegisterPasienBaru({ flash }: { flash?: string }) {
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
        alamat: '',
        no_telp: '',
        poliklinik: '' as PoliklinikType,
        pembayaran: '' as PembayaranType,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(PasienController.storeNew(), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <HeadingSmall
                title="Pendaftaran Pasien Baru"
                description="Isi data berikut untuk mendaftarkan pasien baru"
            />
            {flash && (
                <div className="rounded bg-green-100 p-2 text-green-800">
                    {flash}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Grid utama 2 kolom */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Nama Pendaftar */}
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
                            value={data.poliklinik}
                            onValueChange={(val) =>
                                setData('poliklinik', val as PoliklinikType)
                            }
                            required
                        >
                            <SelectTrigger id="poliklinik">
                                <SelectValue placeholder="Pilih poliklinik" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="umum">Umum</SelectItem>
                                <SelectItem value="gigi">Gigi</SelectItem>
                                <SelectItem value="anak">Anak</SelectItem>
                                <SelectItem value="kandungan">
                                    Kandungan
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError
                            className="mt-2"
                            message={errors.poliklinik}
                        />
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
