import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { Transition } from '@headlessui/react';
import { Form } from '@inertiajs/react';
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

export default function RegisterPasienLama() {
    return (
        <div className="max-w-xl space-y-6">
            <HeadingSmall
                title="Pendaftaran Pasien Lama"
                description="Isi data berikut untuk mendaftarkan pasien baru"
            />

            <Form
                {...PasienController.storeOld.form()}
                options={{ preserveScroll: true }}
                className="space-y-6"
            >
                {({ processing, recentlySuccessful, errors }) => (
                    <>

                        <div className="grid gap-2">
                            <Label htmlFor="no_ktp">Nomor KTP</Label>
                            <Input
                                id="no_ktp"
                                name="no_ktp"
                                placeholder="Masukkan nomor KTP"
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.no_ktp}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="alamat">Alamat Saat Ini</Label>
                            <Input
                                id="alamat"
                                name="alamat"
                                placeholder="Masukkan alamat lengkap"
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.alamat}
                            />
                        </div>

                        {/* Nomor Telepon */}
                        <div className="grid gap-2">
                            <Label htmlFor="no_telp">Nomor Telepon</Label>
                            <Input
                                id="no_telp"
                                name="no_telp"
                                placeholder="08xxxxxxxxxx"
                                required
                            />
                            <InputError
                                className="mt-2"
                                message={errors.no_telp}
                            />
                        </div>

                        {/* Poliklinik yang dipilih */}
                        <div className="grid gap-2">
                            <Label htmlFor="poliklinik_id">Poliklinik</Label>
                            <Select name="poliklinik_id" required>
                                <SelectTrigger id="poliklinik_id">
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
                                message={errors.poliklinik_id}
                            />
                        </div>

                        {/* Jenis Pembayaran */}
                        <div className="grid gap-2">
                            <Label htmlFor="pembayaran">Pembayaran</Label>
                            <Select name="pembayaran" required>
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

                        {/* Tombol submit */}
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
                    </>
                )}
            </Form>
        </div>
    );
}
