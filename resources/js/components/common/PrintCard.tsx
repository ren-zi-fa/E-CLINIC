import PasienController from '@/actions/App/Http/Controllers/Pasien/PasienController';
import { Button } from '@/components/ui/button';
import { PatientRegisterRequired } from '@/types/data';
import { router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';

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
    const dataSend: FinalData = {
        nama_pasien: data.nama_pasien,
        usia: data.usia,
        no_telp: data.no_telp,
        alamat: data.alamat,
        jenis_kelamin: data.jenis_kelamin,
        keluhan_sakit: data.keluhan_sakit,
        no_nik: data.no_nik,
        poliklinik_id: data.poliklinik_id,
        no_rm: addition.no_rm,
        nomor_antrian: addition.no_rm,
    };
    const printRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const link = `https://klinikkamu.com/antrian/12`;

    const handlePrint = () => {
        const printWindow = window.open('', '');
        if (!printWindow) {
            console.error('Popup diblokir browser');
            return;
        }

        router.post(PasienController.handleStep3(), dataSend);

        const content = printRef.current;
        if (!content) return;

        printWindow.document.writeln(`
            <html>
                <head>
                    <title>Print</title>
                    <style>
                        @page {
                            size: 80mm 140mm; /* lebar 80mm, tinggi 140mm */
                            margin: 0;
                        }
                        body {
                            width: 80mm;
                            margin: 0;
                            padding: 8px; /* biar tidak nempel pinggir */
                            font-family: sans-serif;
                        }
                    </style>
                </head>
                <body>${content.innerHTML}</body>
            </html>
            `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div className="w-[380px] rounded-xl border p-4 print:w-full">
            <div ref={printRef}>
                {/* Header Klinik */}
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

                {/* Poli */}
                <div className="mb-6 text-center">
                    <h2 className="text-lg font-semibold tracking-wide">
                        Poli {addition.nama_poli}
                    </h2>
                    <p className="text-sm text-neutral-700">
                        Scan untuk memonitor antrian
                    </p>
                </div>

                {/* QR */}
                <div className="mb-4 flex justify-center">
                    <QRCode value={link} size={170} />
                </div>

                {/* Nomor Antrian */}
                <div className="mb-3 text-center">
                    <h1 className="text-6xl font-extrabold tracking-wider">
                        {addition.nomor_antrian}
                    </h1>
                </div>

                <div className="mx-auto mb-6 h-px w-3/4 bg-neutral-200" />

                {/* Catatan */}
                <p className="px-2 text-center text-xs leading-relaxed text-neutral-600 italic">
                    Terima kasih telah mengantri. Harap tetap berada di area
                    klinik sampai nomor Anda dipanggil. Semoga lekas sehat.
                </p>
            </div>

            <Button className="mt-10 w-full" size="lg" onClick={handlePrint}>
                Cetak
            </Button>
        </div>
    );
}
