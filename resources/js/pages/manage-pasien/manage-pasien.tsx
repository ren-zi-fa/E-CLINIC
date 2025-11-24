import { DataTable } from '@/components/common/DataTable';
import AppLayout from '@/layouts/app-layout';
import manage_dokter from '@/routes/manage_dokter';
import { BreadcrumbItem } from '@/types';
import { PaginateData } from '@/types/data';
import { Head } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Pasien', href: manage_dokter.index().url },
];

export const columns: ColumnDef<Pasien[]>[] = [
    {
        accessorKey: 'no',
        header: 'No',
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
        header: 'Jenis Kelamin',
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
    nama_pasien: string;
    usia: number;
    jenis_kelamin: string;
    alamat: string;
    no_telp: string;
    no_rm: string;
};
export default function ManagePasienPage({
    data,
}: {
    data: PaginateData<Pasien[]>;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pasien" />
            <DataTable
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
