import PasienData from '@/components/common/PasienCard';
import StepperPendaftaran from '@/components/common/StepperPendaftaran';
import PoliklinikForm from '@/components/form/form_step2.';
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

type Step1Data = PatientRegisterRequired;

export default function PendaftaranPasienIndex2({
    step1Data,
    step,
}: {
    step1Data: Step1Data;
    step: number;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pendaftaran Pasien" />
            <StepperPendaftaran currentStep={step} />
            <div className="mx-auto mt-10 flex w-full flex-col gap-4 p-4 lg:flex-row">
                <PasienData data={step1Data} />
                <PoliklinikForm data={step1Data} />
            </div>
        </AppLayout>
    );
}
