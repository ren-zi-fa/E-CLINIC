import StepperPendaftaran from '@/components/common/StepperPendaftaran';
import RegisterPasienBaru from '@/components/form/pasien-baru';
import RegisterPasienLama from '@/components/form/pasien-lama';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Import komponen Tabs
import AppLayout from '@/layouts/app-layout';
import pasienDaftar from '@/routes/pasienDaftar';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pendaftaran Pasien',
        href: pasienDaftar.index().url,
    },
];

export default function PendaftaranPasienIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pendaftaran Pasien" />

            <div className="space-y-8">
                <StepperPendaftaran />
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
        </AppLayout>
    );
}
