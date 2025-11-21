import AppLayout from '@/layouts/app-layout';
import manage_dokter from '@/routes/manage_dokter';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Dokter } from '@/types/data';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Manage Dokter', href: manage_dokter.index().url },
];

export default function ManageDokterPage({ data }: { data: Dokter[] }) {
    console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Dokter" />

            <div className="min-h-screen bg-gray-50 p-4 font-sans sm:p-6 lg:p-8">
                <div className="mx-auto w-full max-w-5xl rounded-xl bg-white p-6 shadow-md transition-all duration-300">
                    <h2 className="mb-6 border-b pb-3 text-3xl font-extrabold text-gray-800">
                        Daftar Dokter
                    </h2>

                    {/* Container Table */}
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <Table className="min-w-full divide-y divide-gray-200">
                            <TableCaption className="mt-4 caption-bottom border-t px-6 pt-4 text-sm text-gray-600">
                                Data Dokter Hardcode untuk Demo
                            </TableCaption>

                            {/* Header */}
                            <TableHeader className="bg-blue-50">
                                <TableRow>
                                    <TableHead className="w-[100px] px-6 py-3 text-left text-xs font-bold tracking-wider text-blue-700 uppercase">
                                        ID Dokter
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-bold tracking-wider text-blue-700 uppercase">
                                        Nama Lengkap
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-bold tracking-wider text-blue-700 uppercase">
                                        Spesialisasi
                                    </TableHead>
                                    <TableHead className="px-6 py-3 text-left text-xs font-bold tracking-wider text-blue-700 uppercase">
                                        Jadwal Praktik
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Body */}
                            <TableBody className="divide-y divide-gray-100 bg-white">
                                {data.map((item, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            className={`transition-colors duration-150 hover:bg-blue-50/50 ${
                                                index % 2 === 0
                                                    ? 'bg-white'
                                                    : 'bg-gray-50'
                                            }`}
                                        >
                                            <TableCell className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-700">
                                                {item.no_sip}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-900">
                                                {item.name}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 text-sm whitespace-nowrap text-gray-600">
                                                {item.spesialisasi}
                                            </TableCell>
                                            <TableCell className="px-6 py-4 font-mono text-sm whitespace-nowrap text-green-600">
                                                <ul className="m-0 list-none p-0">
                                                    {item.jadwal_praktik &&
                                                        Object.entries(
                                                            item.jadwal_praktik,
                                                        ).map(
                                                            ([
                                                                hari,
                                                                jamArr,
                                                            ]) => {
                                                                const today =
                                                                    new Date()
                                                                        .toLocaleDateString(
                                                                            'id-ID',
                                                                            {
                                                                                weekday:
                                                                                    'long',
                                                                            },
                                                                        )
                                                                        .toLowerCase(); // "senin"

                                                                const hariLower =
                                                                    hari.toLowerCase();

                                                                const isToday =
                                                                    hariLower ===
                                                                    today;

                                                                return (
                                                                    <li
                                                                        key={
                                                                            hari
                                                                        }
                                                                        className={`mb-1 rounded p-2 ${
                                                                            isToday
                                                                                ? 'bg-yellow-200 font-bold text-black'
                                                                                : ''
                                                                        }`}
                                                                    >
                                                                        <strong>
                                                                            {
                                                                                hari
                                                                            }
                                                                            :
                                                                        </strong>{' '}
                                                                        {jamArr.length >
                                                                        0
                                                                            ? jamArr.join(
                                                                                  ', ',
                                                                              )
                                                                            : 'Libur'}
                                                                    </li>
                                                                );
                                                            },
                                                        )}
                                                </ul>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
