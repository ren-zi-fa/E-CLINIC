import PasienData from '@/components/common/PasienCard';
import PrintCard from '@/components/common/PrintCard';
import StepperPendaftaran from '@/components/common/StepperPendaftaran';
import AppLayout from '@/layouts/app-layout';
import pasienDaftar from '@/routes/pasienDaftar';
import { BreadcrumbItem } from '@/types';
import { PatientRegisterRequired } from '@/types/data';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Pendaftaran Pasien',
        href: pasienDaftar.index().url,
    },
];

type StepData = PatientRegisterRequired;

export default function PendaftaranPasienIndex3({
    step2Data,
    step,
    nama_poli,
    nomor_antrian,
    no_rm,
}: {
    step2Data: StepData;
    step: number;
    nama_poli: string;
    nomor_antrian: string;
    no_rm: string;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pendaftaran Pasien" />
            <StepperPendaftaran currentStep={step} />
            <div className="mt-10 flex justify-center gap-4">
                <PasienData data={step2Data} nama_poli={nama_poli} />
                <PrintCard
                    data={step2Data}
                    addition={{ no_rm, nomor_antrian, nama_poli }}
                />
            </div>
        </AppLayout>
    );
}
