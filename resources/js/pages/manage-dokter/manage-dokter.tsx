import AppLayout from '@/layouts/app-layout';
import manage_dokter from '@/routes/manage_dokter';
import { BreadcrumbItem } from '@/types';
import { Dokter, Poliklinik } from '@/types/data';
import { Head, router, usePage } from '@inertiajs/react';

import ListDokter from '@/components/common/ListDokter';
import StatusPoli from '@/components/common/StatusPoli';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import poliklinik from '@/routes/poliklinik';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dokter', href: manage_dokter.index().url },
];

export default function ManageDokterPage({
    poli_list,
    dokters,
}: {
    poli_list: Poliklinik[];
    dokters: (Dokter & { id: number; poli_name: string })[];
}) {
    const handleToggle = (id: number, val: boolean) => {
        router.put(poliklinik.status(), {
            id,
            status: val,
        });
    };
    const { props } = usePage<{ flash: { success: string } }>();
    useEffect(() => {
        if (!props.flash.success) return;

        toast(props.flash.success, {
            description: new Date().toLocaleString('id-ID', {
                dateStyle: 'full',
                timeStyle: 'medium',
            }),
            action: {
                label: 'Tutup',
                onClick: () => {},
            },
        });
    }, [props.flash.success]);
    const [search, setSearch] = useState('');

    const filtered = dokters.filter(
        (d) =>
            d.name.toLowerCase().includes(search.toLowerCase()) ||
            d.spesialisasi.toLowerCase().includes(search.toLowerCase()) ||
            d.nama_poli.toLowerCase().includes(search.toLowerCase()) ||
            d.no_sip.includes(search),
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="dokter" />
            <div className="mx-4 mt-2">
                <h1 className="mt-5 border-l-4 border-purple-500 pl-4 text-2xl font-bold">
                    Daftar Poli
                </h1>
                <div className="rounded-2x col-span-4 p-4">
                    <StatusPoli poli={poli_list} handleToggle={handleToggle} />
                </div>
                <h1 className="mt-5 mb-2 border-l-4 border-blue-500 pl-4 text-2xl font-bold">
                    Daftar Dokter
                </h1>
                <div className="my-4 flex justify-between">
                    <Button
                        className=""
                        onClick={() => router.get(manage_dokter.tambah().url)}
                    >
                        <Plus /> Dokter
                    </Button>

                    <Input
                        type="text"
                        placeholder="Cari dokter..."
                        className="w-1/2 rounded-md border px-3 py-2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <ListDokter dokters={filtered} />
            </div>
        </AppLayout>
    );
}
