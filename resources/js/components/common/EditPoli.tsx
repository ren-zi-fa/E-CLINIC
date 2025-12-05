import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import poliklinik from '@/routes/poliklinik';
import { useForm } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export default function EditPoli({ id_poli }: { id_poli: number }) {
    const [poli, setPoli] = useState<{ nama: string; kode: string } | null>(
        null,
    );
    const handleOpen = async (open: boolean) => {
        if (open) {
            const resp = await fetch(poliklinik.edit(id_poli).url);
            const data = await resp.json();
            setPoli(data.poli);
        }
    };
    const { setData, data, submit } = useForm<{
        nama: string;
        kode: string;
    }>({
        nama: '',
        kode: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('SUBMIT!', data);
        // submit(DokterController.insert());
    };
    return (
        <Dialog onOpenChange={handleOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Pencil className="h-5 w-5 opacity-70" />
                </Button>
            </DialogTrigger>
            <form onSubmit={handleSubmit}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Poli</DialogTitle>
                        <DialogDescription>Ubah Poli</DialogDescription>
                    </DialogHeader>

                    {/* isi input di sini nanti bisa diisi value dari fetch */}
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="nama">Nama</Label>
                            <Input
                                id="nama"
                                name="nama"
                                defaultValue={poli?.nama}
                                onChange={(e) =>
                                    setData('nama', e.target.value)
                                }
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="kode">Kode</Label>
                            <Input
                                id="kode"
                                name="kode"
                                defaultValue={poli?.kode}
                                onChange={(e) =>
                                    setData('kode', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                    <Button type="button">Save changes</Button>
                </DialogContent>
            </form>
        </Dialog>
    );
}
