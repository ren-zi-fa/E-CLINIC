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
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dokter', href: manage_dokter.index().url },
];

export default function ManageDokterPage({
    dokter,
    poli_list,
}: {
    dokter: Dokter[];
    poli_list: Poliklinik[];
}) {
    const [isOpenToggle, setOpenToggle] = useState(false);
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
                {/* jadwal dokter */}
                <div className="col-span-8">
                    <Table className="col-span-3 mx-auto max-w-5xl border">
                        <TableHeader>
                            <TableRow className="[&>*]:border-r">
                                <TableHead rowSpan={2}>No</TableHead>
                                <TableHead rowSpan={2}>Nama</TableHead>
                                <TableHead rowSpan={2}>No. SIP</TableHead>
                                <TableHead rowSpan={2}>Spesialisasi</TableHead>
                                <TableHead rowSpan={2}>Poliklinik</TableHead>
                                <TableHead colSpan={5} className="text-center">
                                    Jadwal Praktik
                                </TableHead>
                            </TableRow>

                            <TableRow className="[&>*]:border-r">
                                <TableHead>Senin</TableHead>
                                <TableHead>Selasa</TableHead>
                                <TableHead>Rabu</TableHead>
                                <TableHead>Kamis</TableHead>
                                <TableHead>Jumat</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {(() => {
                                const grouped = dokter.reduce<
                                    Record<string, Dokter[]>
                                >(
                                    (acc, d) => {
                                        if (!acc[d.nama_poli])
                                            acc[d.nama_poli] = [];
                                        acc[d.nama_poli].push(d);
                                        return acc;
                                    },
                                    {} as Record<string, Dokter[]>,
                                );

                                return Object.entries(grouped).map(
                                    ([poli, list]) =>
                                        list.map((d, i) => (
                                            <TableRow
                                                key={`${poli}-${i}`}
                                                className="[&>*]:border-r"
                                            >
                                                <TableCell>{i + 1}</TableCell>
                                                <TableCell>{d.name}</TableCell>
                                                <TableCell>
                                                    {d.no_sip}
                                                </TableCell>
                                                <TableCell>
                                                    {d.spesialisasi}
                                                </TableCell>

                                                {i === 0 && (
                                                    <TableCell
                                                        rowSpan={list.length}
                                                        className="text-center font-semibold"
                                                    >
                                                        {poli}
                                                    </TableCell>
                                                )}

                                                <TableCell>
                                                    {d.jadwal_praktik.senin}
                                                </TableCell>
                                                <TableCell>
                                                    {d.jadwal_praktik.selasa}
                                                </TableCell>
                                                <TableCell>
                                                    {d.jadwal_praktik.rabu}
                                                </TableCell>
                                                <TableCell>
                                                    {d.jadwal_praktik.kamis}
                                                </TableCell>
                                                <TableCell>
                                                    {d.jadwal_praktik.jumat}
                                                </TableCell>
                                            </TableRow>
                                        )),
                                );
                            })()}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
