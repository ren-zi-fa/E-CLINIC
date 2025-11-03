import { InitParam } from '@/types/data';
import { useEffect, useRef } from 'react';

export default function usePrevious(value: InitParam) {
    const ref = useRef<InitParam | null>(null);

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}
