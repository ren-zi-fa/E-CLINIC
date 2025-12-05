import manage_dokter from '@/routes/manage_dokter';
import { Dokter } from '@/types/data';
import { router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { Card } from '../ui/card';

type Doktery = (Dokter & { id: number })[];
interface ListDokterProps {
    dokters: Doktery;
}

export default function ListDokter({ dokters }: ListDokterProps) {
    return (
        <>
            <div className="flex justify-center">
                <Card className="mt-2 grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-4 rounded border p-4 shadow-sm">
                    {dokters.map((dokter) => (
                        <div
                            key={dokter.id}
                            className="relative flex items-center justify-between gap-3 rounded border px-4 py-4"
                        >
                            <button
                                className="absolute top-2 right-2 rounded p-2 transition-colors hover:bg-accent/60"
                                onClick={() =>
                                    router.get(
                                        manage_dokter.edit(dokter.name).url,
                                    )
                                }
                            >
                                <Pencil className="h-5 w-5 opacity-70" />
                            </button>
                            {/* Badge poli_name di kanan bawah */}
                            <span className="absolute right-2 bottom-2 rounded-full bg-blue-400 px-2 py-1 text-xs font-semibold text-white shadow">
                                {dokter.nama_poli}
                            </span>

                            <div className="rounded-full border bg-purple-500 p-3 text-white">
                                {dokter.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')
                                    .slice(0, 2)}
                            </div>

                            <div className="flex flex-1 flex-col">
                                <p className="text-base font-semibold">
                                    {dokter.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Spesialis: {dokter.spesialisasi}
                                </p>
                                <p className="text-sm">{dokter.no_sip}</p>
                            </div>
                        </div>
                    ))}
                </Card>
            </div>
        </>
    );
}
