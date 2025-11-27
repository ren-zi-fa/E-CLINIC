import AppLayout from '@/layouts/app-layout';
import manage_dokter from '@/routes/manage_dokter';
import { BreadcrumbItem } from '@/types';
import { Dokter, Poliklinik } from '@/types/data';
import { Head, router } from '@inertiajs/react';

import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import poliklinik from '@/routes/poliklinik';


const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dokter', href: manage_dokter.index().url },
];

export default function ManageDokterPage({
    poli_list,
}: {

    poli_list: Poliklinik[];
}) {

    const handleToggle = (id: number, val: boolean) => {
        router.put(poliklinik.status(), {
            id,
            status: val,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="dokter" />
            <div className="mt-10 grid grid-cols-12">
                <div className="col-span-4">
                    <Table className="mr-6 w-[480px]">
                        <TableHeader>
                            <TableRow className="">
                                <TableHead>Nama</TableHead>
                                <TableHead>Kode</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-center">
                                    Aksi
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {poli_list.map((item) => {
                                const isOpen = item.is_open;

                                return (
                                    <TableRow key={item.id} className="">
                                        <TableCell className="font-medium">
                                            {item.nama}
                                        </TableCell>

                                        <TableCell className="text-muted-foreground">
                                            {item.kode}
                                        </TableCell>

                                        <TableCell
                                            className={
                                                'font-semibold ' +
                                                (isOpen
                                                    ? 'text-green-600'
                                                    : 'text-red-600')
                                            }
                                        >
                                            {isOpen ? 'Open' : 'Close'}
                                        </TableCell>

                                        <TableCell className="flex justify-center">
                                            <Switch
                                                id={`switch-${item.id}`}
                                                checked={isOpen}
                                                onCheckedChange={() =>
                                                    handleToggle(
                                                        item.id,
                                                        isOpen,
                                                    )
                                                }
                                                className={
                                                    isOpen
                                                        ? 'data-[state=checked]:bg-green-600'
                                                        : 'data-[state=unchecked]:bg-red-600'
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
         
            </div>
        </AppLayout>
    );
}
