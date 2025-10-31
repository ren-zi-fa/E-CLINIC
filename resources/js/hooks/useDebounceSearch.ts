/* eslint-disable @typescript-eslint/no-explicit-any */
import { router } from '@inertiajs/react';
import { debounce, pickBy } from 'lodash';

import { useCallback, useEffect, useState } from 'react';
import usePrevious from './usePrevious';

const useDebouncedSearch = (
    url: string,
    initialParams: any,
    initialTimeDebounce = 50,
) => {
    const [params, setParams] = useState(initialParams);
    const [timeDebounce, setTimeDebounce] = useState(initialTimeDebounce);
    const prevParams = usePrevious(params);

    const search = useCallback(
        debounce((params) => {
            router.get(url, pickBy(params), {
                replace: true,
                preserveScroll: true,
                preserveState: true,
                queryStringArrayFormat: 'indices',
            });
        }, timeDebounce),
        [timeDebounce],
    );

    useEffect(() => {
        if (prevParams) {
            search(params);
        }
    }, [params]);

    return { params, setParams, setTimeDebounce };
};

export default useDebouncedSearch;
