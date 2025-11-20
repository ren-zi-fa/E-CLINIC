import { Button } from '@/components/ui/button';
import { PatientRegisterRequired } from '@/types/data';
import html2canvas from 'html2canvas-pro';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
// import library

import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { router } from '@inertiajs/react';
import jsPDF from 'jspdf';

type PrintProps = PatientRegisterRequired;
type Additional = {
    nomor_antrian: string;
    no_rm: string;
    nama_poli: string;
};
type FinalData = PatientRegisterRequired & {
    nomor_antrian: string;
    no_rm: string;
};

export default function PrintCard({
    data,
    addition,
}: {
    data: PrintProps;
    addition: Additional;
}) {
    const printRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const dataSend: FinalData = {
        ...data,
        no_rm: addition.no_rm,
        nomor_antrian: addition.nomor_antrian,
    };

    const link = `https://klinikkamu.com/antrian/12`;

    const handlePrint = async () => {
        setIsLoading(true);
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            backgroundColor: '#ffffff',
        });

        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            unit: 'mm',
            format: [80, 140],
        });

        const pdfWidth = 80;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // BUKA DI TAB BARU, BUKAN DOWNLOAD
        const pdfURL = pdf.output('bloburl');
        window.open(pdfURL);

        setIsLoading(false);
        router.post(PasienController.handleStep3(), dataSend);
    };

    return (
        <div className="w-[380px] rounded-xl border p-4 print:w-full">
            <div ref={printRef} className="bg-white p-4">
                <div className="mb-6 text-center">
                    <h1 className="text-xl font-extrabold tracking-wide">
                        KLINIK SEHAT SENTOSA
                    </h1>
                    <p className="text-xs text-neutral-600">
                        Jl. Merpati No. 12, Jakarta
                    </p>
                    <p className="text-xs text-neutral-600">
                        Telp: 0812-3456-7890
                    </p>
                </div>

                <div className="mx-auto mb-6 h-px w-3/4 bg-neutral-200" />

                <div className="mb-6 text-center">
                    <h2 className="text-lg font-semibold tracking-wide">
                        Poli {addition.nama_poli}
                    </h2>
                    <p className="text-sm text-neutral-700">
                        Scan untuk memonitor antrian
                    </p>
                </div>

                <div className="mb-4 flex justify-center">
                    <QRCode value={link} size={170} />
                </div>

                <div className="mb-3 text-center">
                    <h1 className="text-6xl font-extrabold tracking-wider">
                        {addition.nomor_antrian}
                    </h1>
                </div>

                <div className="mx-auto mb-6 h-px w-3/4 bg-neutral-200" />

                <p className="px-2 text-center text-xs leading-relaxed text-neutral-600 italic">
                    Terima kasih telah mengantri. Harap tetap berada di area
                    klinik sampai nomor Anda dipanggil.
                </p>
            </div>

            <Button
                className="mt-10 w-full"
                size="lg"
                onClick={handlePrint}
                disabled={isLoading}
            >
                {isLoading ? 'Mencetak...' : 'Cetak'}
            </Button>
        </div>
    );
}
