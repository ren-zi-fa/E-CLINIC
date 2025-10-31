import poliklinik from '@/routes/poliklinik';
import { useEffect, useState } from 'react';

type PoliList = {
    id: number;
    nama: string;
    is_open: boolean;
};
export default function ListPoliklnik() {
    const [polikliniks, setPolikliniks] = useState<PoliList[]>();
    useEffect(() => {
        fetch(poliklinik.list().url)
            .then((res) => res.json()) // ubah response ke JSON
            .then((data) => {
                setPolikliniks(data.polikliniks);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div className="space-y-3 w-xs">
                {polikliniks?.map((data, i) => (
                    <div
                        key={i}
                        className="rounded-xl border border-gray-200 bg-white p-4 shadow-md transition hover:shadow-lg"
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
        </>
    );
}
