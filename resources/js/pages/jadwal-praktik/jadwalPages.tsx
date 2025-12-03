import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import jadwal_praktik from '@/routes/jadwal_praktik';
import { BreadcrumbItem } from '@/types';
import { Dokter } from '@/types/data';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Jadwal Praktik', href: jadwal_praktik.index().url },
];
type Jadwal = Dokter;
export default function JadwalPage({ jadwal }: { jadwal: Jadwal[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Praktik" />
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
                            <TableHead>Sabtu</TableHead>
                            <TableHead>Minggu</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {(() => {
                            const grouped = jadwal.reduce<
                                Record<string, Dokter[]>
                            >((acc, d) => {
                                if (!acc[d.nama_poli]) acc[d.nama_poli] = [];
                                acc[d.nama_poli].push(d);
                                return acc;
                            }, {});

                            let nomor = 1;

                            return Object.entries(grouped).map(([poli, list]) =>
                                list.map((d, i) => {
                                    const jadwalArray = Object.values(d.jadwal_praktik);
                                    return (
                                        <TableRow
                                            key={`${poli}-${i}`}
                                            className="[&>*]:border-r"
                                        >
                                            <TableCell>{nomor++}</TableCell>
                                            <TableCell>{d.name}</TableCell>
                                            <TableCell>{d.no_sip}</TableCell>
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

                                            {jadwalArray.map((jadwal, idx) => (
                                                <TableCell key={idx}>
                                                    {jadwal}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                }),
                            );
                        })()}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
