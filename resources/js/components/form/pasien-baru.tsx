import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { calculateAge } from '@/lib/calcAge';
import { PatientRegisterRequired } from '@/types/data';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';

type RegisterPasien = Omit<
    PatientRegisterRequired,
    'poliklinik_id' | 'keluhan_sakit'
>;
export default function RegisterPasienBaru() {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Date | undefined>(undefined);

    const { data, setData, processing, errors, submit } =
        useForm<Required<RegisterPasien>>({
            nama_pasien: '',
            no_nik: '',
            usia: 0,
            alamat: '',
            no_telp: '',
            jenis_kelamin: 'L',
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        submit(PasienController.handleStep1());
    };
    return (
        <div className="mx-auto w-2xl max-w-5xl gap-4 rounded-2xl border border-muted-foreground/20 p-5 shadow-sm lg:flex-row">
            <form onSubmit={handleSubmit} className="mt-4 space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>

                        <RadioGroup
                            id="jenis_kelamin" 
                            onValueChange={(value: 'P' | 'L') =>
                                setData('jenis_kelamin', value)
                            }
                            value={data.jenis_kelamin}
                            className="flex items-center gap-4"
                            required
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="L" id="r1" />
                                <Label htmlFor="r1">Laki-laki</Label>
                            </div>

                            {/* Opsi Perempuan */}
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="P" id="r2" />
                                <Label htmlFor="r2">Perempuan</Label>
                            </div>
                        </RadioGroup>
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
                </div>
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
