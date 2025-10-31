/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils.js';

import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import { Button } from '../ui/button';

const SortIcon = ({ sort }: any) => {
    if (sort === 'desc') return <ArrowDownIcon className="ml-2 h-3.5 w-3.5" />;
    if (sort === 'asc') return <ArrowUpIcon className="ml-2 h-3.5 w-3.5" />;
    return <ChevronsUpDownIcon className="ml-2 h-4 w-4" />;
};

export default function TableSortHeader({
    className,
    title,
    sort,
    ...props
}: any) {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <Button
                variant="ghost"
                size="sm"
                className="-ml-0.5 flex h-8 items-center border-none hover:bg-gray-200"
                {...props}
            >
                <span>{title}</span>
                <SortIcon sort={sort} />
            </Button>
        </div>
    );
}
