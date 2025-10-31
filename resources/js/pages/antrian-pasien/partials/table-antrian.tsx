/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import TableFilter from '@/components/data-table/table-filter';

import TablePagination from '@/components/data-table/table-pagination';
import TableSortHeader from '@/components/data-table/table-short-header';
import TableToolbar from '@/components/data-table/table-toolbar';
import useDebouncedSearch from '@/hooks/useDebounceSearch';
import useSorting from '@/hooks/useSorting';
import antrianRoute from '@/routes/antrian';
import { AntrianItem, AntrianResponse } from '@/types/data';
import { usePage } from '@inertiajs/react';

type PageProps = {
    antrian: AntrianResponse;
};
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
    const { antrian } = usePage<PageProps>().props;
    console.log(antrian);
    // initial params from server-provided paginator
    const initialParams = {
        search: '',
        limit: antrian.per_page || 10,
        col: '',
        sort: '',
    };

    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        antrianRoute.index().url,
        initialParams,
    );

    const { sort } = useSorting(params, setParams);
    const statusOptions = [
        { value: 'menunggu', label: 'Menunggu' },
        { value: 'proses', label: 'Proses' },
        { value: 'selesai', label: 'Selesai' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TableToolbar
                        placeholder="Cari pasien..."
                        params={params}
                        setParams={setParams}
                        setTimeDebounce={setTimeDebounce}
                        search={params.search}
                    />

                    <TableFilter
                        title="Status"
                        params={params}
                        setParams={setParams}
                        setTimeDebounce={setTimeDebounce}
                        filter="status"
                        options={statusOptions}
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-28">
                                <TableSortHeader
                                    title="No. Antrian"
                                    sort={
                                        params.col === 'nomor_antrian'
                                            ? params.sort
                                            : ''
                                    }
                                    onClick={() => sort('nomor_antrian')}
                                />
                            </TableHead>
                            <TableHead className="w-32">
                                <TableSortHeader
                                    title="No. RM"
                                    sort={
                                        params.col === 'no_rm'
                                            ? params.sort
                                            : ''
                                    }
                                    onClick={() => sort('no_rm')}
                                />
                            </TableHead>
                            <TableHead className="w-42">
                                <TableSortHeader
                                    title="Nama Pasien"
                                    sort={
                                        params.col === 'nama_pasien'
                                            ? params.sort
                                            : ''
                                    }
                                    onClick={() => sort('nama_pasien')}
                                />
                            </TableHead>
                            <TableHead>Poliklinik</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-20">Waktu Daftar</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {antrian?.data && antrian.data.length > 0 ? (
                            antrian.data.map((item: AntrianItem) => (
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
                                    <TableCell>{item.created_at}</TableCell>
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
                {antrian?.links && <TablePagination links={antrian.links} />}
            </div>
        </div>
    );
}
