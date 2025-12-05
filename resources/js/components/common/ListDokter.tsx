import manage_dokter from '@/routes/manage_dokter';
import { Dokter } from '@/types/data';
import { router } from '@inertiajs/react';
import { Eye, Pencil, Trash } from 'lucide-react';
import React, { cloneElement, isValidElement } from 'react';
import { Button } from '../ui/button';
import { AlertDelete } from './AlertDelete';
import { InfoDialog } from './InfoDialog';

type Doktery = (Dokter & { id: number })[];
interface ListDokterProps {
    dokters: Doktery;
}
type ButtonItem = {
    icon: React.ReactNode;
    action?: () => void;
    variant?: 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    wrapper?: (child: React.ReactNode) => React.ReactNode;
};

function Buttons({ items }: { items: ButtonItem[] }) {
    return (
        <>
            {items.map((item, i) => {
                const btn = (
                    <Button
                        variant="outline"
                        className="rounded p-1 transition-colors hover:bg-accent/60"
                        onClick={item.action}
                    >
                        {item.icon}
                    </Button>
                );

                const content = item.wrapper ? item.wrapper(btn) : btn;

                if (isValidElement(content)) {
                    return cloneElement(content, { key: `btn-${i}` });
                }

                return (
                    <React.Fragment key={`btn-${i}`}>{content}</React.Fragment>
                );
            })}
        </>
    );
}

export default function ListDokter({ dokters }: ListDokterProps) {
    return (
        <>
            <div className="flex justify-center">
                <div className="mt-2 grid w-full grid-cols-1 gap-2 rounded md:grid-cols-1 xl:grid-cols-3 ">
                    {dokters.map((dokter) => (
                        <div
                            key={dokter.id}
                            className="relative flex items-center gap-3 rounded border p-4"
                        >
                            <div className="">
                                <div className="absolute top-2 right-2 space-x-1">
                                    <Buttons
                                        items={[
                                            {
                                                icon: (
                                                    <Pencil className="h-5 w-5 opacity-70" />
                                                ),
                                                action: () =>
                                                    router.get(
                                                        manage_dokter.edit(
                                                            dokter.id,
                                                        ).url,
                                                    ),
                                            },
                                            {
                                                icon: (
                                                    <Eye className="h-5 w-5 opacity-70" />
                                                ),
                                                wrapper: (child) => (
                                                    <InfoDialog
                                                        title="Informasi Dokter"
                                                        data={{
                                                            name: dokter.name,
                                                            nama_poliklinik:
                                                                dokter.nama_poliklinik,
                                                            no_sip: dokter.no_sip,
                                                            spesialisasi:
                                                                dokter.spesialisasi,
                                                            poliklinik:
                                                                dokter.nama_poliklinik,
                                                        }}
                                                    >
                                                        {child}
                                                    </InfoDialog>
                                                ),
                                            },
                                            {
                                                icon: (
                                                    <Trash className="h-5 w-5 opacity-70" />
                                                ),
                                                wrapper: (child) => (
                                                    <AlertDelete
                                                        title="Hapus Dokter?"
                                                        description="Data dokter ini akan hilang selamanya."
                                                        onConfirm={() =>
                                                            router.delete(
                                                                manage_dokter.destroy(
                                                                    dokter.id,
                                                                ),
                                                            )
                                                        }
                                                    >
                                                        {child}
                                                    </AlertDelete>
                                                ),
                                            },
                                        ]}
                                    />
                                </div>
                                <span className="absolute right-2 bottom-2 mt-5 rounded-full bg-blue-400 px-2 py-1 text-xs font-semibold text-white shadow">
                                    {dokter.nama_poliklinik}
                                </span>
                            </div>
                                <div className="rounded-full border bg-purple-500 p-3 text-white">
                                    {dokter.name
                                        .split(' ')
                                        .map((n) => n[0])
                                        .join('')
                                        .slice(0, 2)}
                                </div>
                            <div>
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
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
