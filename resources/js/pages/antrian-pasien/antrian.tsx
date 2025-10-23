import StatCard from '@/components/common/CardAntrian';
import AppLayout from '@/layouts/app-layout';
import antrian from '@/routes/antrian';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Activity, CheckCircle, Clock, Users } from 'lucide-react';

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
                    />
                    <StatCard
                        title="Menunggu"
                        value={totalMenunggu}
                        color="text-yellow-600"
                        icon={Clock}
                    />
                    <StatCard
                        title="Proses"
                        value={totalProses}
                        color="text-blue-600"
                        icon={Activity}
                    />
                    <StatCard
                        title="Selesai"
                        value={totalSelesai}
                        icon={CheckCircle}
                        color="text-green-600"
                    />
                </div>
            </AppLayout>
        </>
    );
}
