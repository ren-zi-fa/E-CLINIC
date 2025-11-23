import AppLayout from '@/layouts/app-layout';
import manage_dokter from '@/routes/manage_dokter';
import { BreadcrumbItem } from '@/types';
import { Dokter } from '@/types/data';
import { Head } from '@inertiajs/react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dokter', href: manage_dokter.index().url },
];

export default function ManageDokterPage({ dokter }: { dokter: Dokter[] }) {
    console.log(dokter);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="dokter" />
            <div className="rounded-md">
                <Table className="mx-auto mt-10 max-w-5xl border">
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

                            return Object.entries(grouped).map(([poli, list]) =>
                                list.map((d, i) => (
                                    <TableRow
                                        key={`${poli}-${i}`}
                                        className="[&>*]:border-r"
                                    >
                                        <TableCell>{i + 1}</TableCell>
                                        <TableCell>{d.name}</TableCell>
                                        <TableCell>{d.no_sip}</TableCell>
                                        <TableCell>{d.spesialisasi}</TableCell>

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
        </AppLayout>
    );
}
