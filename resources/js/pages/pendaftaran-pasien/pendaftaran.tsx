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

import { PoliklinikMonitor } from '@/types/data';

import { Head, usePage } from '@inertiajs/react';
import { Activity, Clock, Stethoscope, Users } from 'lucide-react';

import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pendaftaran Pasien',
        href: pasienDaftar.index().url,
    },
];

export default function PendaftaranPasienIndex({
    data_monitor,
}: {
    data_monitor: PoliklinikMonitor[];
}) {
    const { props } = usePage<{ flash: { success: string } }>();
    const [showSuccess, setShowSuccess] = useState(true);

    useEffect(() => {
        setShowSuccess(true);
    }, [props.flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pendaftaran Pasien" />

            {/* Flash Message */}
            {props.flash.success && showSuccess && (
                <div className="relative mx-auto mt-2 mb-4 w-1/2 rounded-2xl bg-green-100 p-3 text-green-800">
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

            <div className="grid grid-cols-1 gap-6 space-y-10 md:grid-cols-12 md:space-y-0">
                {/* Form Bagian Kiri */}
                <div className="col-span-1 space-y-8 p-10 md:col-span-8">
                    <StepperPendaftaran currentStep={1} />
                    <Tabs defaultValue="baru">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="baru">
                                Register Pasien Baru
                            </TabsTrigger>
                            <TabsTrigger value="lama">
                                Register Pasien Lama
                            </TabsTrigger>
                        </TabsList>
                        <div className="mt-4 w-full">
                            <TabsContent value="baru">
                                <RegisterPasienBaru />
                            </TabsContent>
                            <TabsContent value="lama">
                                <RegisterPasienLama />
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                {/* Live Monitoring */}
                <div className="col-span-1 space-y-6 p-4 md:col-span-4 md:flex md:flex-col md:justify-center">
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
                                {data_monitor.map((item) => (
                                    <div
                                        key={`${item.id}-${item.doctor_id}`}
                                        className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30"
                                    >
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                <Stethoscope className="h-3.5 w-3.5 text-muted-foreground" />
                                                {item.nama}
                                            </div>
                                            <p className="text-xs text-muted-foreground">
                                                {item.nama_doktor}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                                <span className="text-lg font-bold">
                                                    {item.total_antrian}
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-semibold tracking-wider uppercase">
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
                                <p className="font-semibold">Jam Operasional</p>
                                <p className="mt-1 text-xs opacity-90">
                                    Pendaftaran tutup pukul 14:00 WIB. Pastikan
                                    data pasien valid.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
