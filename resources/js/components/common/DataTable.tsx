'use client';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { PaginationLink } from '@/types/data';
import { router } from '@inertiajs/react';
import { Button } from '../ui/button';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount: number;
    currentPage: number;
    rowCount: number;
    next_page: string | null;
    prev_page: string | null;
    links: PaginationLink[];
    onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
    columns,
    pageCount,
    links,
    data,
    next_page,
    prev_page,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        pageCount: pageCount,
        debugRows: false,
        debugColumns: true,
        debugHeaders: true,
        debugTable: true,

        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 px-4 py-4">
                <div className="space-x-2">
                    {links
                        .filter((link) => link.label.match(/^\d+$/)) // hanya label yang angka
                        .map((link, idx) => (
                            <Button
                                key={idx}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => router.get(link.url!)}
                            >
                                {link.label}
                            </Button>
                        ))}
                </div>
                <div className="space-x-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => prev_page && router.get(prev_page)}
                        disabled={!prev_page}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => next_page && router.get(next_page)}
                        disabled={!next_page}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
