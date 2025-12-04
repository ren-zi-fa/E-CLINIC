import StatCard from '@/components/common/CardAntrian';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import antrian from '@/routes/antrian';
import poliklinik from '@/routes/poliklinik';
import { BreadcrumbItem } from '@/types';
import { AntrianItem } from '@/types/data';
import { Head, router } from '@inertiajs/react';
import { Activity, CheckCircle, Clock, Users } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ListAntrian from './partials/table-antrian';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Antrian Kunjungan Pasien',
        href: '#',
    },
];

type AntrianProps = {
    totalAntrian: number;
    totalMenunggu: number;
    totalProses: number;
    totalSelesai: number;
    antrians: AntrianItem[];
};

type PoliList = {
    id: number;
    nama: string;
    is_open: boolean;
    kode: string;
};

export default function AntrianPasienIndex({
    totalAntrian,
    totalMenunggu,
    totalProses,
    totalSelesai,
    antrians,
}: AntrianProps) {
    const [polikliniks, setPolikliniks] = useState<PoliList[] | null>(null);

    const tabFromUrl = useMemo(() => {
        const url = new URL(window.location.href);
        return url.searchParams.get('tab');
    }, []);

    const [activeTab, setActiveTab] = useState<string>(tabFromUrl ?? '0');
    useEffect(() => {
        fetch(poliklinik.list().url)
            .then((res) => res.json())
            .then((data) => {
                setPolikliniks(data.polikliniks);
                if (!tabFromUrl) setActiveTab('0');
            })
            .catch(console.error);
    }, [tabFromUrl]);

    const handleTabChange = useCallback(
        (value: string) => {
            setActiveTab(value);

            if (polikliniks) {
                const selectedPoli = polikliniks[parseInt(value)];
                if (selectedPoli) {
                    router.get(antrian.byPoli.url({ query: { tab: value } }));
                }
            }
        },
        [polikliniks],
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Kunjungan Pasien" />

            <div className="space-y-8 px-8">
                <h1 className="mt-5 border-l-4 border-purple-500 pl-4 text-2xl font-bold">
                    Statistik Antrian
                </h1>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
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

                <h1 className="border-l-4 border-blue-500 pl-4 text-2xl font-bold">
                    Antrian Pengunjung
                </h1>
            </div>

            <div className="mt-10 px-8">
                {polikliniks && (
                    <Tabs
                        value={activeTab}
                        onValueChange={handleTabChange}
                        className="w-full"
                        orientation="horizontal"
                    >
                        <div className="mb-10 flex w-full justify-center">
                            <TabsList className="flex w-full justify-center gap-2">
                                {polikliniks.map((item, i) => (
                                    <TabsTrigger
                                        key={item.id}
                                        value={String(i)}
                                        className="px-6 py-2"
                                    >
                                        {item.nama}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        <div className="col-span-8">
                            {polikliniks.map((item, i) => (
                                <TabsContent
                                    key={item.id}
                                    value={String(i)}
                                    className="w-full"
                                >
                                    <ListAntrian
                                        title={item.nama}
                                        antrian={antrians}
                                    />
                                </TabsContent>
                            ))}
                        </div>
                    </Tabs>
                )}
            </div>
        </AppLayout>
    );
}
