import { Card, CardContent } from '@/components/ui/card';
import { PatientRegisterRequired } from '@/types/data';
import {
    Cake,
    Hash,
    Hospital,
    MapPin,
    MessageSquare,
    Phone,
    User,
} from 'lucide-react';

type PasienCard = Omit<
    PatientRegisterRequired,
    'poliklinik_id' | 'keluhan_sakit'
> & {
    poliklinik_id?: PatientRegisterRequired['poliklinik_id'];
    keluhan_sakit?: PatientRegisterRequired['keluhan_sakit'];
};

type DetailRowProps = {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    value: string | number;
};


export default function PasienData({
    data,
    nama_poli,
}: {
    data: PasienCard;
    nama_poli?: string;
}) {
    const DetailRow = ({ icon: Icon, label, value }: DetailRowProps) => (
        <div className="flex items-center gap-3 py-1">
            <Icon className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase">
                    {label}
                </span>
                <span className="text-sm font-medium">{value}</span>
            </div>
        </div>
    );

    return (
        <Card className="w-sm border-gray-200 shadow-sm">
            <CardContent className="space-y-4 p-5">
                {/* Bagian Header Card yang Dimodifikasi */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-primary" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">
                                {data.nama_pasien}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Hash className="h-3 w-3" />
                                NIK: {data.no_nik}
                            </span>
                        </div>
                    </div>
                    {/* Tujuan Poliklinik Dipindahkan ke Bawah Nama Pasien */}
                    {nama_poli && (
                        <div className="flex items-center gap-2 rounded-md border border-blue-100 bg-blue-50/50 p-2 text-blue-800">
                            <Hospital className="h-5 w-5 flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-blue-600 uppercase">
                                    Tujuan Poliklinik
                                </span>
                                <span className="text-base font-semibold">
                                    {nama_poli}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                {/* End Bagian Header Card yang Dimodifikasi */}

                <div className="space-y-2 border-t pt-4">
                    <DetailRow
                        icon={Cake}
                        label="Usia"
                        value={`${data.usia} Tahun`}
                    />

                    <DetailRow
                        icon={User}
                        label="Jenis Kelamin"
                        value={
                            data.jenis_kelamin === 'L'
                                ? 'Laki-laki'
                                : 'Perempuan'
                        }
                    />

                    <DetailRow
                        icon={Phone}
                        label="Telepon"
                        value={data.no_telp}
                    />

                    <DetailRow
                        icon={MapPin}
                        label="Alamat"
                        value={data.alamat}
                    />

                    {data.keluhan_sakit && (
                        <DetailRow
                            icon={MessageSquare}
                            label="Keluhan"
                            value={data.keluhan_sakit}
                        />
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
