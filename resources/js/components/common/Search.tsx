import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';

export default function SearchBar() {
    const [value, setValue] = useState<string>('');
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        const handler = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);
            const per_page = params.get('per_page');

            router.get(
                window.location.pathname,
                {
                    search: value,
                    ...(per_page ? { per_page } : {}),
                    page: 1,
                },
                {
                    preserveState: true,
                },
            );
        }, 300);

        return () => clearTimeout(handler);
    }, [value]);

    return (
        <Input
            type="text"
            className="w-full rounded border px-3 py-1"
            placeholder="Masukkan Nama, Alamat, No RM Pasien"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
