import { InitParam } from '@/types/data';
import { Dispatch, SetStateAction } from 'react';

const useSorting = (
    initialParams: InitParam,
    setParams: Dispatch<SetStateAction<InitParam>>,
) => {
    const sort = (column: string) => {
        setParams((prevParams: InitParam) => ({
            ...prevParams,
            col: column,
            sort: prevParams.sort
                ? prevParams.sort === 'asc'
                    ? 'desc'
                    : 'asc'
                : 'asc',
        }));
    };

    return { sort };
};

export default useSorting;
