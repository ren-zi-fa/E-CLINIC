import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Poliklinik } from '@/types/data';
import { Stethoscope } from 'lucide-react';
import EditPoli from './EditPoli';

export default function ListPoli({
    poli,
    handleToggle,
}: {
    poli: Poliklinik[];
    handleToggle: (id: number, val: boolean) => void;
}) {
    return (
        <div className="mr-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5">
            {poli.map((item) => {
                const isOpen = item.is_open;

                return (
                    <Card
                        key={item.id}
                        className="flex flex-col justify-between p-4"
                    >
                        <CardHeader className="flex flex-row items-center justify-between p-0">
                            <CardTitle className="text-xl font-semibold">
                                {item.nama}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Stethoscope
                                    className={`h-6 w-6 ${
                                        isOpen
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                />
                                <EditPoli  id_poli={item.id}/>
                            </div>
                        </CardHeader>

                        <CardContent className="mt-4 space-y-3 p-0">
                            <div className="text-base text-muted-foreground">
                                Kode: {item.kode}
                            </div>

                            <div
                                className={`font-semibold ${
                                    isOpen ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
                                {isOpen ? 'Open' : 'Close'}
                            </div>

                            <div className="mt-2 flex justify-center">
                                <Switch
                                    id={`switch-${item.id}`}
                                    checked={isOpen}
                                    onCheckedChange={(val) =>
                                        handleToggle(item.id, val)
                                    }
                                    className={
                                        isOpen
                                            ? 'data-[state=checked]:bg-green-600'
                                            : 'data-[state=unchecked]:bg-red-600'
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
