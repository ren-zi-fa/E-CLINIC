/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/lib/utils.js';

import { CheckIcon, CirclePlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Separator } from '../ui/separator';

const FilterBadges = ({ selectedValues, options }: any) => (
    <>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <Badge
            variant="secondary"
            className="rounded-sm px-1 font-normal lg:hidden"
        >
            {selectedValues.length}
        </Badge>
        <div className="hidden space-x-1 lg:flex">
            {selectedValues.length > 2 ? (
                <Badge
                    variant="secondary"
                    className="rounded-sm bg-gray-200/50 px-1 font-normal"
                >
                    {selectedValues.length} selected
                </Badge>
            ) : (
                options
                    .filter((option: any) =>
                        selectedValues.includes(option.value),
                    )
                    .map((option: any) => (
                        <Badge
                            variant="secondary"
                            key={option.value}
                            className="rounded-sm bg-gray-200/50 px-1 font-normal"
                        >
                            {option.label}
                        </Badge>
                    ))
            )}
        </div>
    </>
);

const FilterOptions = ({ options, params, filter, onSelectFilter }: any) => (
    <CommandList>
        <CommandEmpty>No filters found.</CommandEmpty>
        <CommandGroup>
            {options.map((option: any) => {
                const isSelected = params.filters?.includes(
                    `${filter}:${option.value}`,
                );
                return (
                    <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={onSelectFilter}
                    >
                        <div
                            className={cn(
                                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                isSelected
                                    ? 'bg-gray-900 text-white'
                                    : 'opacity-50 [&_svg]:invisible',
                            )}
                        >
                            <CheckIcon className={cn('h-4 w-4')} />
                        </div>
                        {option.icon && (
                            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                    </CommandItem>
                );
            })}
        </CommandGroup>
    </CommandList>
);

const ClearFilters = ({ clearFilters }: any) => (
    <>
        <CommandSeparator />
        <CommandGroup>
            <CommandItem
                onSelect={clearFilters}
                className="justify-center text-center"
            >
                Clear filters
            </CommandItem>
        </CommandGroup>
    </>
);

export default function TableFilter({
    params,
    setParams,
    setTimeDebounce,
    title,
    filter,
    options,
}: any) {
    const [selectedValues, setSelectedValues] = useState([]);

    const onSelectFilter = (value: any) => {
        const newFilter = `${filter}:${value}`;
        let filters = params?.filters ? [...params.filters] : [];

        filters = filters.includes(newFilter)
            ? filters.filter((filter) => filter !== newFilter)
            : [...filters, newFilter];

        setTimeDebounce(50);
        setParams({ ...params, filters });
    };

    const clearFilters = () => {
        setSelectedValues([]);
        setParams({
            ...params,
            filters: params.filters.filter(
                (f: any) => !f.startsWith(`${filter}:`),
            ),
        });
    };

    useEffect(() => {
        if (params.filters) {
            setSelectedValues(
                params.filters
                    .filter((f: any) => f.startsWith(`${filter}:`))
                    .map((f: any) => f.split(':')[1]),
            );
        }
    }, [params.filters, filter]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-full border-dashed border-gray-400 text-xs hover:bg-gray-200/50 md:w-auto"
                >
                    <CirclePlusIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues.length > 0 && (
                        <FilterBadges
                            selectedValues={selectedValues}
                            options={options}
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 md:w-[200px]" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <FilterOptions
                        options={options}
                        params={params}
                        filter={filter}
                        onSelectFilter={onSelectFilter}
                    />
                    {selectedValues.length > 0 && (
                        <ClearFilters clearFilters={clearFilters} />
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}
