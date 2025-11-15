import StatCard from '@/components/common/CardAntrian';
import AppLayout from '@/layouts/app-layout';
import antrian from '@/routes/antrian';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, CheckCircle, Clock, Users } from 'lucide-react';
import ListPoliklnik from './partials/list-poliklinik';
import DataTable from './partials/table-antrian';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Antrian Kunjungan Pasien',
        href: antrian.index().url,
    },
];
type AntrianProps = {
    totalAntrian: number;
    totalMenunggu: number;
    totalProses: number;
    totalSelesai: number;
};
export default function AntrianPasienIndex({
    totalAntrian,
    totalMenunggu,
    totalProses,
    totalSelesai,
}: AntrianProps) {
   
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Kunjungan Pasien" />
                <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-4">
                    <StatCard
                        title="Total Antrian Hari Ini"
                        value={totalAntrian}
                        icon={Users}
                        bg="bg-blue-300"
                        color="text-yellow-600"
                    />
                    <StatCard
                        title="Menunggu"
                        value={totalMenunggu}
                       color="text-red-600"
                        icon={Clock}
                        bg="bg-orange-300"
                    />
                    <StatCard
                        title="Proses"
                        value={totalProses}
                        color="text-blue-600"
                        icon={Activity}
                        bg="bg-purple-300"
                    />
                    <StatCard
                        title="Selesai"
                        value={totalSelesai}
                        icon={CheckCircle}
                        color="text-green-600"
                        bg="bg-green-300"
                    />
                </div>
                <div className="grid grid-cols-12 items-center gap-4 p-4">
                    <div className="col-span-3 flex justify-center">
                        <ListPoliklnik />
                    </div>
                    <div className="col-span-9">
                        <DataTable />
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
