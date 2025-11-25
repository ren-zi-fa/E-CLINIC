import { DataTable } from '@/components/common/DataTable';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import manage_dokter from '@/routes/manage_dokter';
import { BreadcrumbItem } from '@/types';
import { PaginateData } from '@/types/data';
import { Head, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Pasien', href: manage_dokter.index().url },
];

export const columns: ColumnDef<Pasien, any>[] = [
    {
        accessorKey: 'no',
        header: 'No',
        cell: (info) => info.row.original.no,
    },
    {
        accessorKey: 'no_rm',
        header: 'No RM',
    },
    {
        accessorKey: 'nama_pasien',
        header: 'Nama Pasien',
    },
    {
        accessorKey: 'jenis_kelamin',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            const params = new URLSearchParams(window.location.search);
            const currentSortValue = params.get('sort_gender');
            const isAscending = currentSortValue === '1';
            const SortIcon =
                isSorted === 'asc' || isAscending
                    ? ArrowUp
                    : isSorted === 'desc' || currentSortValue === '0'
                      ? ArrowDown
                      : ArrowUpDown;

            const handleSort = () => {
                const next = currentSortValue === '1' ? '0' : '1';

                router.get(
                    window.location.pathname,
                    {
                        ...Object.fromEntries(params),
                        sort_gender: next,
                        page: 1,
                    },
                    {
                        preserveState: true,
                        replace: true,
                    },
                );
            };

            return (
                <Button
                    variant="ghost"
                    onClick={handleSort}
                    className="p-0 hover:bg-transparent"
                >
                    Jenis Kelamin
                    <SortIcon className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="ms-3">
                {row.original.jenis_kelamin == 'P' ? 'Perempuan' : 'Laki-Laki'}
            </div>
        ),
    },
    {
        accessorKey: 'usia',
        header: 'Usia',
    },
    {
        accessorKey: 'no_telp',
        header: 'No Telpon',
    },
    {
        accessorKey: 'alamat',
        header: 'Alamat',
    },
];

type Pasien = {
    id?: number;
    nama_pasien: string;
    usia: number;
    jenis_kelamin: string;
    alamat: string;
    no_telp: string;
    no_rm: string;
    no?: number;
};
export default function ManagePasienPage({
    data,
    search,
}: {
    data: PaginateData<Pasien>;
    search: string;
}) {
    console.log(search);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pasien" />

            <DataTable
                firstPageUrl={data.first_page_url}
                lastPageUrl={data.last_page_url}
                per_page={data.per_page}
                resultSearch={search}
                next_page={data.next_page_url}
                prev_page={data.prev_page_url}
                links={data.links}
                rowCount={data.last_page}
                columns={columns}
                data={data.data}
                currentPage={data.current_page}
                pageCount={data.per_page}
            />
        </AppLayout>
    );
}
