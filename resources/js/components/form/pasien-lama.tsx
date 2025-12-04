/* eslint-disable @typescript-eslint/no-explicit-any */

import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { calculateAge } from '@/lib/calcAge';
import pasienDaftar from '@/routes/pasienDaftar';
import { PatientRegisterRequired } from '@/types/data';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronDownIcon, Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';

export default function RegisterPasienLama() {
    const { data, setData, processing, errors, reset, submit } = useForm<
        Required<
            Omit<PatientRegisterRequired, 'poliklinik_id' | 'keluhan_sakit'>
        >
    >({
        nama_pasien: '',
        no_nik: '',
        alamat: '',
        usia: 0,
        jenis_kelamin: '',
        no_telp: '',
    });

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
    const [pasienFound, setPasienFound] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            toast.warning('Masukkan NIK atau No RM terlebih dahulu');
            return;
        }

        setLoadingSearch(true);

        try {
            const res = await fetch(
                pasienDaftar.search({
                    query: { query: encodeURIComponent(searchQuery) },
                }).url,
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
        submit(PasienController.handleStep1ExistingPatient());
    };

    return (
        <div className="mx-auto w-full gap-4 rounded-2xl border border-muted-foreground/20 p-5 shadow-sm lg:flex-row">
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
                                        key as keyof Omit<
                                            PatientRegisterRequired,
                                            'poliklinik_id' | 'keluhan_sakit'
                                        >,
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
                    {/* usia */}
                    <div className="grid gap-2">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="date" className="px-1">
                                Tanggal Lahir
                            </Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        id="date"
                                        className="w-48 justify-between font-normal"
                                    >
                                        {date
                                            ? date.toLocaleDateString('id-ID')
                                            : 'Pilih tanggal lahir'}
                                        <ChevronDownIcon />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto overflow-hidden p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        startMonth={new Date(1970, 0)}
                                        endMonth={new Date(2025, 5)}
                                        selected={date}
                                        captionLayout="dropdown"
                                        onSelect={(selectedDate) => {
                                            setDate(selectedDate);
                                            setOpen(false);

                                            if (selectedDate) {
                                                const age =
                                                    calculateAge(selectedDate);

                                                setData((previousData) => ({
                                                    ...previousData,
                                                    usia: age,
                                                    tanggal_lahir: format(
                                                        selectedDate,
                                                        'yyyy-MM-dd',
                                                    ),
                                                }));
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <InputError className="mt-2" message={errors.usia} />
                    </div>

                    <div className="grid gap-2">
                        <Label>Jenis Kelamin</Label>
                        <RadioGroup
                            value={data.jenis_kelamin}
                            onValueChange={(value) =>
                                setData('jenis_kelamin', value as 'P' | 'L')
                            }
                            disabled={pasienFound}
                            className="flex items-center gap-4"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="L"
                                    id="jk-l"
                                    disabled={pasienFound}
                                />
                                <Label
                                    htmlFor="jk-l"
                                    className={
                                        pasienFound ? 'text-neutral-500' : ''
                                    }
                                >
                                    Laki-laki
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="P"
                                    id="jk-p"
                                    disabled={pasienFound}
                                />
                                <Label
                                    htmlFor="jk-p"
                                    className={
                                        pasienFound ? 'text-neutral-500' : ''
                                    }
                                >
                                    Perempuan
                                </Label>
                            </div>
                        </RadioGroup>

                        <InputError
                            className="mt-2"
                            message={errors.jenis_kelamin}
                        />
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="alamat">Alamat Saat Ini</Label>
                    <Textarea
                        id="alamat"
                        value={data.alamat}
                        onChange={(e) => setData('alamat', e.target.value)}
                        placeholder="Masukkan alamat lengkap"
                        className={
                            pasienFound ? 'bg-neutral-100 text-neutral-500' : ''
                        }
                    />
                    <InputError message={errors.alamat} />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        disabled={processing}
                        className="mt-5 w-full"
                        size="lg"
                    >
                        {processing ? 'prosess...' : 'Lanjut'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
