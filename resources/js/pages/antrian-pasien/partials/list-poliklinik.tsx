import { usePoli } from '@/hooks/useCatgeoryPoli';
import poliklinik from '@/routes/poliklinik';
import { useEffect, useState } from 'react';

type PoliList = {
    id: number;
    nama: string;
    is_open: boolean;
};

export default function ListPoliklnik() {
    const [polikliniks, setPolikliniks] = useState<PoliList[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { poli, setPoli } = usePoli();

    useEffect(() => {
        const fetchPoli = async () => {
            try {
                const res = await fetch(poliklinik.list().url);
                const data = await res.json();

                const list: PoliList[] = data.polikliniks;
                setPolikliniks(list);

                // Default: pilih item pertama
                if (list.length > 0) {
                    setSelectedId(list[0].id);
                    setPoli(list[0].nama);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchPoli();
    }, [setPoli]);

    return (
        <div className="w-xs space-y-3">
            {polikliniks.map((data) => (
                <div
                    key={data.id}
                    onClick={() => {
                        setSelectedId(data.id);
                        setPoli(data.nama);
                    }}
                    className={`cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-md transition hover:shadow-lg ${selectedId === data.id ? 'ring-2 ring-blue-500' : ''} `}
                >
                    <p className="font-medium text-gray-800">{data.nama}</p>

                    <p
                        className={`mt-1 text-sm ${
                            data.is_open ? 'text-green-600' : 'text-red-600'
                        }`}
                    >
                        {data.is_open ? 'Buka' : 'Tutup'}
                    </p>
                </div>
            ))}
        </div>
    );
}
