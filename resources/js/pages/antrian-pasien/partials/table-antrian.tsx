import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { usePoli } from '@/hooks/useCatgeoryPoli';
import { AntrianItem } from '@/types/data';
import { useEffect, useState } from 'react';

const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case 'menunggu':
            return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
        case 'proses':
            return 'bg-blue-50 text-blue-700 ring-blue-600/20';
        case 'selesai':
            return 'bg-green-50 text-green-700 ring-green-600/20';
        default:
            return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    }
};

export default function DataTable() {
    const [antrian, setAntrian] = useState<AntrianItem[]>();
    const { poli: poliCatgeory } = usePoli();

    console.log(antrian);
    useEffect(() => {
        const fetchAntrianByPoli = async () => {
            const result = await fetch(`/antrian/poliklinik/${poliCatgeory}`);
            const response = await result.json();
            setAntrian(response.antrian);
        };
        fetchAntrianByPoli();
    }, [poliCatgeory]);
    return (
        <div className="space-y-4 ">
            <div className="overflow-hidden rounded-md border shadow-lg">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-32">No.Antrian</TableHead>
                            <TableHead className="w-32">
                                No. Rekam Medis
                            </TableHead>
                            <TableHead className="w-42">Nama Pasien</TableHead>
                            <TableHead>Poliklinik</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-20">Waktu Daftar</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {antrian && antrian.length > 0 ? (
                            antrian.map((item: AntrianItem) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-semibold">
                                        {item.nomor_antrian}
                                    </TableCell>
                                    <TableCell>{item.no_rm}</TableCell>
                                    <TableCell className="max-w-[250px] truncate">
                                        {item.nama_pasien}
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            {item.nama_poliklinik}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getStatusBadgeClass(
                                                item.status,
                                            )}`}
                                        >
                                            {item.status.toUpperCase()}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.waktu_daftar}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Action buttons can go here */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-24 bg-white text-center"
                                >
                                    Belum ada antrian hari ini.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
