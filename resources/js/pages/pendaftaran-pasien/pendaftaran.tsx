import StepperPendaftaran from '@/components/common/StepperPendaftaran';
import RegisterPasienBaru from '@/components/form/pasien-baru';
import RegisterPasienLama from '@/components/form/pasien-lama';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import pasienDaftar from '@/routes/pasienDaftar';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Activity, Clock, Stethoscope, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pendaftaran Pasien',
        href: pasienDaftar.index().url,
    },
];
const mockQueueData = [
    {
        poli: 'Poli Umum',
        dokter: 'dr. Rina Santoso',
        antrian: 8,
        status: 'Buka',
        color: 'text-green-600',
    },
    {
        poli: 'Poli Gigi',
        dokter: 'drg. Budi Gunawan',
        antrian: 3,
        status: 'Buka',
        color: 'text-blue-600',
    },
    {
        poli: 'Poli Anak',
        dokter: 'dr. Citra Melati',
        antrian: 12,
        status: 'Penuh',
        color: 'text-orange-600',
    },
    {
        poli: 'Poli THT',
        dokter: '-',
        antrian: 0,
        status: 'Tutup',
        color: 'text-gray-500',
    },
];

export default function PendaftaranPasienIndex() {
    const { props } = usePage<{ flash: { success: string } }>();
    const [showSuccess, setShowSuccess] = useState(true);
    const [showError, setShowError] = useState(true);

    useEffect(() => {
        setShowSuccess(true);
        setShowError(true);
    }, [props.flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pendaftaran Pasien" />
            {props.flash.success && showSuccess && (
                <div className="relative mb-4 w-1/2 mt-2  mx-auto rounded-2xl bg-green-100 p-3 text-green-800">
                    <span>{props.flash.success}</span>
                    <button
                        type="button"
                        onClick={() => setShowSuccess(false)}
                        className="absolute top-2 right-2 rounded p-1 text-green-700 hover:bg-green-200"
                    >
                        ✕
                    </button>
                </div>
            )}
            <StepperPendaftaran currentStep={1} />
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-7">
                <div className="space-y-8 lg:col-span-4">
                    <Tabs
                        defaultValue="baru"
                        className="flex w-full flex-col items-center"
                    >
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="baru">
                                Register Pasien Baru
                            </TabsTrigger>
                            <TabsTrigger value="lama">
                                Register Pasien Lama
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="baru" className="mt-6 w-full">
                            <RegisterPasienBaru />
                        </TabsContent>
                        <TabsContent value="lama" className="mt-6 w-full">
                            <RegisterPasienLama />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="lg:11mt-10 flex items-center lg:col-span-2">
                    <div className="mx-auto w-full items-center space-y-6 p-4">
                        <Card className="border-muted-foreground/20 shadow-sm">
                            <CardHeader className="bg-muted/50 pb-4">
                                <div className="flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-primary" />
                                    <CardTitle className="text-lg">
                                        Live Monitoring
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Status antrian poliklinik saat ini.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-0">
                                <div className="flex flex-col divide-y">
                                    {mockQueueData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30"
                                        >
                                            {/* Info Poli & Dokter */}
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm font-medium">
                                                    <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
                                                    {item.poli}
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.dokter}
                                                </p>
                                            </div>

                                            {/* Info Jumlah Antrian */}
                                            <div className="text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-lg font-bold">
                                                        {item.antrian}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`text-[10px] font-semibold tracking-wider uppercase ${item.color}`}
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-blue-100 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/20">
                            <CardContent className="flex items-start gap-3 p-4">
                                <Clock className="mt-0.5 h-5 w-5 text-blue-600" />
                                <div className="text-sm text-blue-900 dark:text-blue-100">
                                    <p className="font-semibold">
                                        Jam Operasional
                                    </p>
                                    <p className="mt-1 text-xs opacity-90">
                                        Pendaftaran tutup pukul 14:00 WIB.
                                        Pastikan data pasien valid.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
