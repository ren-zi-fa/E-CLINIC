import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { PatientRegisterRequired, Poliklinik } from '@/types/data';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import InputError from '../input-error';
import { Button } from '../ui/button';

type RegisterPasien = PatientRegisterRequired;

export default function PoliklinikForm({ data }: { data: RegisterPasien }) {
    const [poliList, setPoliList] = useState<Poliklinik[]>([]);

    const {
        data: formData,
        setData,
        processing,
        errors,
        recentlySuccessful,
        submit,
    } = useForm<Required<RegisterPasien>>({
        nama_pasien: data.nama_pasien,
        no_nik: data.no_nik,
        usia: data.usia,
        keluhan_sakit: '',
        alamat: data.alamat,
        no_telp: data.no_telp,
        poliklinik_id: 0,
        jenis_kelamin: data.jenis_kelamin,
    });

    useEffect(() => {
        const fetchPoli = async () => {
            const response = await fetch('/poliklinik');
            const res = await response.json();
            setPoliList(res.polikliniks);
        };
        fetchPoli();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        submit(PasienController.handleStep2());
    };

    return (
        <Card className="w-full border-gray-200 p-4 shadow-sm">
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    <div className="space-y-3">
                        <Label className="font-medium">Pilih Poliklinik</Label>

                        <RadioGroup
                            value={formData.poliklinik_id.toString()}
                            onValueChange={(value) =>
                                setData('poliklinik_id', Number(value))
                            }
                            className="space-y-3"
                        >
                            {poliList.map((item) => {
                                const isSelected =
                                    formData.poliklinik_id === item.id;
                                const isDisabled = !item.is_open;

                                return (
                                    <label
                                        key={item.id}
                                        htmlFor={item.nama}
                                        className={`flex items-center justify-between rounded-lg border p-4 transition ${
                                            isDisabled
                                                ? 'pointer-events-none cursor-not-allowed border-gray-200 bg-gray-50 text-gray-400'
                                                : isSelected
                                                  ? 'border-primary bg-primary/5'
                                                  : 'border-muted hover:bg-muted/30'
                                        } `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem
                                                id={item.nama}
                                                value={item.id.toString()}
                                                disabled={isDisabled}
                                            />

                                            <span className="text-sm font-semibold">
                                                {item.nama}
                                            </span>
                                        </div>

                                        <span
                                            className={`rounded-md px-2 py-1 text-xs font-medium ${
                                                item.is_open
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-red-100 text-red-700'
                                            }`}
                                        >
                                            {item.is_open ? 'Buka' : 'Tutup'}
                                        </span>
                                    </label>
                                );
                            })}
                        </RadioGroup>

                        <InputError
                            className="mt-2"
                            message={errors.poliklinik_id}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="font-medium">Keluhan Pasien</Label>
                        <Textarea
                            placeholder="Tuliskan keluhan pasien..."
                            value={formData.keluhan_sakit}
                            onChange={(e) =>
                                setData('keluhan_sakit', e.target.value)
                            }
                            className="min-h-[120px]"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.keluhan_sakit}
                        />
                    </div>
                </CardContent>

                <Button disabled={processing} className="mt-5 w-full" size="lg">
                    {processing ? 'Menyimpan...' : 'Lanjut'}
                </Button>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-neutral-600">Data tersimpan</p>
                </Transition>
            </form>
        </Card>
    );
}
