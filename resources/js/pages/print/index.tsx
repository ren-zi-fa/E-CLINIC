import { Button } from '@/components/ui/button';
import { useRef, useState } from 'react';
import QRCode from 'react-qr-code';
export default function PrintPage() {
    const printRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastRegistered, setLastRegistered] = useState<any>();

    const link = `https://klinikkamu.com/antrian/12`;

    const handlePrint = () => {
        const printWindow = window.open('', '');
        if (!printWindow) {
            console.error('Popup diblokir browser');
            return;
        }

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
        <div className="flex min-h-screen items-center justify-center bg-neutral-100">
            <div className="mx-auto w-[380px] rounded-xl border border-neutral-300 bg-white p-8 shadow-xl print:w-full">
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
                            Poli Umum
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
                            {/* {lastRegistered.no_rm} */}
                        </h1>
                    </div>

                    {/* Detail Pasien */}
                    {lastRegistered && (
                        <div className="mb-6 text-center">
                            <p className="text-base font-medium">
                                {lastRegistered.nama_pendaftar}
                            </p>
                            <p className="text-sm text-neutral-600">
                                {lastRegistered.waktu_daftar}
                            </p>
                        </div>
                    )}

                    <div className="mx-auto mb-6 h-px w-3/4 bg-neutral-200" />

                    {/* Catatan */}
                    <p className="px-2 text-center text-xs leading-relaxed text-neutral-600 italic">
                        Terima kasih telah mengantri. Harap tetap berada di area
                        klinik sampai nomor Anda dipanggil. Semoga lekas sehat.
                    </p>
                </div>

                <Button
                    className="mt-10 w-full"
                    size="lg"
                    onClick={handlePrint}
                >
                    Cetak
                </Button>
            </div>
        </div>
    );
}
