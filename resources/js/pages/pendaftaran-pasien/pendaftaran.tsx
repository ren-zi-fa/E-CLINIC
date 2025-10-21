import RegisterPasienBaru from '@/components/form/pasien-baru';
import RegisterPasienLama from '@/components/form/pasien-lama';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { pasienDaftar } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pendaftaran Pasien',
        href: pasienDaftar().url,
    },
];

export default function PendaftaranPasienIndex() {
    const [activeTab, setActiveTab] = useState<'baru' | 'lama'>('baru');
    const { props } = usePage<{ flash: { success?: string } }>();

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Pendaftaran Pasien" />

                <div className="flex flex-col items-center gap-8">
                    <div className="mt-10 flex gap-4">
                        <Button
                            variant={
                                activeTab === 'baru' ? 'default' : 'outline'
                            }
                            onClick={() => setActiveTab('baru')}
                        >
                            Register Pasien Baru
                        </Button>

                        <Button
                            variant={
                                activeTab === 'lama' ? 'default' : 'outline'
                            }
                            onClick={() => setActiveTab('lama')}
                        >
                            Register Pasien Lama
                        </Button>
                    </div>

                    <div className="w-full max-w-2xl">
                        {activeTab === 'baru' && (
                            <RegisterPasienBaru flash={props.flash.success} />
                        )}
                        {activeTab === 'lama' && <RegisterPasienLama />}
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
