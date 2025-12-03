import DokterController from '@/actions/App/Http/Controllers/Dokter/DokterController';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import manage_dokter from '@/routes/manage_dokter';
import { BreadcrumbItem } from '@/types';
import { JadwalPraktik } from '@/types/data';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dokter', href: manage_dokter.index().url },
    { title: 'Edit Dokter', href: '#' },
];

export type JadwalCheckbox = {
    [key in keyof JadwalPraktik]: boolean;
};

export interface DokterRelasi {
    id: number;
    user_id: number;
    spesialisasi: string;
    no_sip: string;
    poliklinik_id: number;
    jadwal_praktik: JadwalPraktik;
}

export interface DokterWithUser {
    id: number;
    name: string;
    dokter: DokterRelasi;
}

const HARI_KERJA = [
    { key: 'senin', label: 'Senin' },
    { key: 'selasa', label: 'Selasa' },
    { key: 'rabu', label: 'Rabu' },
    { key: 'kamis', label: 'Kamis' },
    { key: 'jumat', label: 'Jumat' },
    { key: 'sabtu', label: 'Sabtu' },
    { key: 'minggu', label: 'Minggu' },
] as const;

export default function EditDokterPage({ dokter }: { dokter: DokterWithUser }) {
    const data = dokter.dokter;

    // Parse jadwal dari database menjadi jam mulai dan jam selesai
    const parseJadwal = (jadwalStr: string) => {
        if (jadwalStr === '-') {
            return { aktif: false, jamMulai: '08:00', jamSelesai: '17:00' };
        }
        const times = jadwalStr.split(', ').map((s) => s.trim());
        const [jamMulai, jamSelesai1] = times[0].split(' - ');
        const jamSelesai = times[1]?.split(' - ')[1] || jamSelesai1;
        return { aktif: true, jamMulai, jamSelesai };
    };

    const initialJadwalState = HARI_KERJA.reduce(
        (acc, { key }) => {
            acc[key] = parseJadwal(
                data.jadwal_praktik[key as keyof JadwalPraktik],
            );
            return acc;
        },
        {} as Record<
            string,
            { aktif: boolean; jamMulai: string; jamSelesai: string }
        >,
    );

    const [jadwalState, setJadwalState] = useState(initialJadwalState);

    const {
        data: dataSubmit,
        setData,
        processing,
        errors,
        submit,
    } = useForm({
        name: dokter.name,
        no_sip: data.no_sip,
        spesialisasi: data.spesialisasi,
        jadwal_praktik: data.jadwal_praktik,
    });

    const handleJadwalChange = (
        hari: string,
        field: 'aktif' | 'jamMulai' | 'jamSelesai',
        value: boolean | string,
    ) => {
        setJadwalState((prev) => {
            const updated = { ...prev };
            if (field === 'aktif') {
                updated[hari].aktif = value as boolean;
            } else {
                updated[hari][field] = value as string;
            }

            const jadwalBaru = { ...dataSubmit.jadwal_praktik };
            if (updated[hari].aktif) {
                jadwalBaru[hari as keyof JadwalPraktik] =
                    `${updated[hari].jamMulai} - ${updated[hari].jamSelesai}`;
            } else {
                jadwalBaru[hari as keyof JadwalPraktik] = '-';
            }
            setData('jadwal_praktik', jadwalBaru);

            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submit(DokterController.update(data.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="edit dokter" />
            <div className="mx-auto w-full p-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section: Informasi Dokter */}
                    <Card className="border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Informasi Dokter
                        </h2>
                        <div className="space-y-4">
                            <div className="">
                                <Label
                                    htmlFor="nama_dokter"
                                    className="text-sm font-medium"
                                >
                                    Nama Dokter
                                </Label>
                                <Input
                                    id="nama_dokter"
                                    name="name"
                                    defaultValue={dokter.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                    className="mt-1"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="">
                                <Label
                                    htmlFor="no_sip"
                                    className="text-sm font-medium"
                                >
                                    NO SIP
                                </Label>
                                <Input
                                    id="no_sip"
                                    name="no_sip"
                                    defaultValue={data.no_sip}
                                    onChange={(e) =>
                                        setData('no_sip', e.target.value)
                                    }
                                    required
                                    className="mt-1"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.no_sip}
                                />
                            </div>

                            <div className="">
                                <Label
                                    htmlFor="spesialisasi"
                                    className="text-sm font-medium"
                                >
                                    Spesialisasi
                                </Label>
                                <Input
                                    id="spesialisasi"
                                    name="spesialisasi"
                                    defaultValue={data.spesialisasi}
                                    onChange={(e) =>
                                        setData('spesialisasi', e.target.value)
                                    }
                                    required
                                    className="mt-1"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.spesialisasi}
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Section: Jadwal Praktik */}
                    <Card className="border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="mb-4 text-lg font-semibold text-gray-900">
                            Jadwal Praktik
                        </h2>
                        <div className="space-y-3">
                            {HARI_KERJA.map(({ key, label }) => (
                                <div
                                    key={key}
                                    className="flex flex-col rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:bg-gray-100"
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

                                    {jadwalState[key]?.aktif && (
                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div>
                                                <Label className="text-xs font-medium text-gray-700">
                                                    Jam Mulai
                                                </Label>
                                                <Input
                                                    type="time"
                                                    value={
                                                        jadwalState[key]
                                                            ?.jamMulai ||
                                                        '08:00'
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
                                                            ?.jamSelesai ||
                                                        '17:00'
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
                                    )}

                                    {!jadwalState[key]?.aktif && (
                                        <div className="mt-2 text-xs text-gray-500">
                                            Tidak aktif pada hari ini
                                        </div>
                                    )}
                                    <InputError
                                        className="mt-2"
                                        message={
                                            errors[`jadwal_praktik.${key}`]
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Action Button */}
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 bg-red-600 text-white"
                            onClick={() =>
                                router.get(manage_dokter.index().url)
                            }
                        >
                            Batal
                        </Button>
                        <Button disabled={processing} className="flex-1">
                            {processing ? 'prosess...' : 'Simpan Perubahan'}
                        </Button>{' '}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
