import DokterController from '@/actions/App/Http/Controllers/Dokter/DokterController';
import { PasswordInput } from '@/components/common/PasswordInput';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { parseJadwal } from '@/lib/helper';
import manage_dokter from '@/routes/manage_dokter';
import poliklinik from '@/routes/poliklinik';
import { BreadcrumbItem } from '@/types';
import { Poliklinik } from '@/types/data';
import { Head, router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dokter', href: manage_dokter.index().url },
    { title: 'Tambah Dokter', href: manage_dokter.tambah().url },
];
const HARI_KERJA = [
    { key: 'senin', label: 'Senin' },
    { key: 'selasa', label: 'Selasa' },
    { key: 'rabu', label: 'Rabu' },
    { key: 'kamis', label: 'Kamis' },
    { key: 'jumat', label: 'Jumat' },
    { key: 'sabtu', label: 'Sabtu' },
    { key: 'minggu', label: 'Minggu' },
] as const;

export default function TambahDokter() {
    const [poliList, setPoliList] = useState<Poliklinik[]>([]);

    const {
        data: dataInsert,
        setData,
        processing,
        errors,
        submit,
    } = useForm<{
        jadwal_praktik: Record<string, string>;
        name: string;
        no_sip: string;
        poliklinik_id: number;
        spesialisasi: string;
        password: string;
        password_confirmation: string;
        email: string;
    }>({
        jadwal_praktik: {} as Record<string, string>,
        name: '',
        password: '',
        password_confirmation: '',
        no_sip: '',
        poliklinik_id: 0,
        spesialisasi: '',
        email: '',
    });

    useEffect(() => {
        const fetchPoli = async () => {
            const response = await fetch(poliklinik.list().url);
            const res = await response.json();
            setPoliList(res.polikliniks || []);
        };
        fetchPoli();
    }, []);

    const initialJadwalState: Record<
        string,
        { aktif: boolean; jamMulai: string; jamSelesai: string }
    > = HARI_KERJA.reduce(
        (acc, { key }) => {
            acc[key] = parseJadwal(dataInsert.jadwal_praktik?.[key] || '-') || {
                aktif: false,
                jamMulai: '08:00',
                jamSelesai: '17:00',
            };
            return acc;
        },
        {} as Record<
            string,
            { aktif: boolean; jamMulai: string; jamSelesai: string }
        >,
    );

    const [jadwalState, setJadwalState] = useState(initialJadwalState);

    const handleJadwalChange = (
        hari: string,
        field: 'aktif' | 'jamMulai' | 'jamSelesai',
        value: boolean | string,
    ) => {
        setJadwalState((prev) => {
            const updated = { ...prev };
            if (field === 'aktif') updated[hari].aktif = value as boolean;
            else updated[hari][field] = value as string;

            const jadwalBaru = { ...dataInsert.jadwal_praktik };
            jadwalBaru[hari] = updated[hari].aktif
                ? `${updated[hari].jamMulai} - ${updated[hari].jamSelesai}`
                : '-';
            setData('jadwal_praktik', jadwalBaru);

            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(DokterController.insert());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Dokter" />
            <div className="mx-auto w-full p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informasi Dokter */}
                    <Card className="border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Informasi Dokter
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="nama_dokter"
                                    className="text-sm font-medium"
                                >
                                    Nama Dokter
                                </Label>
                                <Input
                                    id="nama_dokter"
                                    name="name"
                                    value={dataInsert.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    className="mt-1"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-sm font-medium"
                                >
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="@mail.com"
                                    value={dataInsert.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    className="mt-1"
                                />
                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <PasswordInput
                                    label="Password"
                                    name="password"
                                    value={dataInsert.password}
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />

                                <PasswordInput
                                    label="Konfirmasi Password"
                                    name="password_confirmation"
                                    value={dataInsert.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="no_sip"
                                    className="text-sm font-medium"
                                >
                                    NO SIP
                                </Label>
                                <Input
                                    placeholder="SIP-2912"
                                    id="no_sip"
                                    name="no_sip"
                                    value={dataInsert.no_sip}
                                    onChange={(e) =>
                                        setData('no_sip', e.target.value)
                                    }
                                    required
                                    className="mt-1"
                                />
                                <InputError
                                    message={errors.no_sip}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="spesialisasi"
                                    className="text-sm font-medium"
                                >
                                    Spesialisasi
                                </Label>
                                <Input
                                    id="spesialisasi"
                                    name="spesialisasi"
                                    value={dataInsert.spesialisasi}
                                    onChange={(e) =>
                                        setData('spesialisasi', e.target.value)
                                    }
                                    required
                                    className="mt-1"
                                />
                                <InputError
                                    message={errors.spesialisasi}
                                    className="mt-2"
                                />
                            </div>
                            <div>
                                <Label className="text-sm font-medium">
                                    Poliklinik
                                </Label>
                                <Select
                                    value={
                                        String(dataInsert.poliklinik_id) || ''
                                    }
                                    onValueChange={(value) =>
                                        setData('poliklinik_id', Number(value))
                                    }
                                >
                                    <SelectTrigger className="mt-1 w-full">
                                        <SelectValue placeholder="Pilih Poliklinik" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {poliList.map((p) => (
                                            <SelectItem
                                                key={p.id}
                                                value={String(p.id)}
                                            >
                                                {p.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </Card>

                    {/* Jadwal Praktik */}
                    <Card className="border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Jadwal Praktik
                        </h2>
                        <div className="space-y-3">
                            {HARI_KERJA.map(({ key, label }) => (
                                <div
                                    key={key}
                                    className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 hover:bg-gray-100"
                                >
                                    <div className="flex items-center justify-between">
                                        <Label className="text-sm font-semibold text-gray-800">
                                            {label}
                                        </Label>
                                        <div className="flex items-center gap-3">
                                            <Checkbox
                                                id={key}
                                                checked={
                                                    jadwalState[key]?.aktif ||
                                                    false
                                                }
                                                onCheckedChange={(checked) =>
                                                    handleJadwalChange(
                                                        key,
                                                        'aktif',
                                                        checked as boolean,
                                                    )
                                                }
                                            />
                                            <Label
                                                htmlFor={key}
                                                className="cursor-pointer text-xs font-medium text-gray-700"
                                            >
                                                Aktif
                                            </Label>
                                        </div>
                                    </div>

                                    {jadwalState[key]?.aktif ? (
                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div>
                                                <Label className="text-xs font-medium text-gray-700">
                                                    Jam Mulai
                                                </Label>
                                                <Input
                                                    type="time"
                                                    value={
                                                        jadwalState[key]
                                                            .jamMulai
                                                    }
                                                    onChange={(e) =>
                                                        handleJadwalChange(
                                                            key,
                                                            'jamMulai',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 bg-white"
                                                />
                                            </div>
                                            <div>
                                                <Label className="text-xs font-medium text-gray-700">
                                                    Jam Selesai
                                                </Label>
                                                <Input
                                                    type="time"
                                                    min="08:00"
                                                    max="17:00"
                                                    value={
                                                        jadwalState[key]
                                                            .jamSelesai
                                                    }
                                                    onChange={(e) =>
                                                        handleJadwalChange(
                                                            key,
                                                            'jamSelesai',
                                                            e.target.value,
                                                        )
                                                    }
                                                    className="mt-1 bg-white"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-2 text-xs text-gray-500">
                                            Tidak aktif pada hari ini
                                        </div>
                                    )}

                                    <InputError
                                        message={
                                            errors[`jadwal_praktik.${key}`]
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="destructive"
                            className="flex-1"
                            onClick={() =>
                                router.get(manage_dokter.index().url)
                            }
                        >
                            Batal
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex-1"
                        >
                            {processing ? 'Proses...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
