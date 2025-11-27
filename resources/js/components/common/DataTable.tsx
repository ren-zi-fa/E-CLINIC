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
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';
import SearchBar from './Search';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount: number;
    currentPage: number;
    rowCount: number;
    next_page: string | null;
    prev_page: string | null;
    links: PaginationLink[];
    per_page: number;

    lastPageUrl: string;
    firstPageUrl: string;
}

export function DataTable<TData, TValue>({
    columns,
    pageCount,
    per_page,
    links,
    data,
    next_page,
    prev_page,

    currentPage,
    firstPageUrl,
    lastPageUrl,
    rowCount,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        manualPagination: true,
        pageCount: pageCount,
        getPaginationRowModel: getPaginationRowModel(),
        getCoreRowModel: getCoreRowModel(),
    });

    const totalPages =
        links.filter((link) => link.label.match(/^\d+$/)).length > 0
            ? Math.max(
                  ...links
                      .filter((link) => link.label.match(/^\d+$/))
                      .map((link) => parseInt(link.label, 10)),
              )
            : pageCount;

    return (
        <div className="p-4 shadow-sm border mb-2">
            <div className="flex items-center justify-between py-4 ">
                <div className="flex items-center gap-2">
                    <span className="text-sm whitespace-nowrap text-muted-foreground">
                        Show:
                    </span>
                    <Select
                        value={per_page.toString()}
                        onValueChange={(value) => {
                            const params = new URLSearchParams(
                                window.location.search,
                            );
                            const search = params.get('search');

                            router.get(window.location.pathname, {
                                per_page: value,
                                ...(search ? { search } : {}),
                                page: 1,
                            });
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px] text-sm">
                            <SelectValue placeholder="Per page" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-xl">
                    <SearchBar />
                </div>
            </div>

            <div className="rounded-md border">
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
            <div className="flex items-center justify-between py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {rowCount > 0
                        ? `${rowCount.toLocaleString()} total rows`
                        : 'No rows found.'}
                </div>

                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {currentPage} of {totalPages}
                    </div>

                    <div className="flex items-center space-x-2">
                        {(() => {
                            const params = new URLSearchParams(
                                window.location.search,
                            );
                            const search = params.get('search') ?? undefined;
                            const sort = params.get('sort_gender') ?? undefined;
                            const perPage = params.get('per_page') ?? undefined;

                            const carry = {
                                ...(search ? { search } : {}),
                                ...(sort ? { sort_gender: sort } : {}),
                                ...(perPage ? { per_page: perPage } : {}),
                            };

                            return (
                                <>
                                    {/* First page */}
                                    <Button
                                        variant="outline"
                                        className="hidden h-8 w-8 p-0 lg:flex"
                                        onClick={() =>
                                            firstPageUrl &&
                                            router.get(firstPageUrl, carry)
                                        }
                                        disabled={!prev_page}
                                    >
                                        <span className="sr-only">
                                            Go to first page
                                        </span>
                                        <ChevronsLeft className="h-4 w-4" />
                                    </Button>

                                    {/* Previous page */}
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() =>
                                            prev_page &&
                                            router.get(prev_page, carry)
                                        }
                                        disabled={!prev_page}
                                    >
                                        <span className="sr-only">
                                            Go to previous page
                                        </span>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>

                                    {/* Numbered pages */}
                                    {links
                                        .filter((link) =>
                                            link.label.match(/^\d+$/),
                                        )
                                        .map((link, idx) => (
                                            <Button
                                                key={idx}
                                                variant={
                                                    link.active
                                                        ? 'default'
                                                        : 'outline'
                                                }
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() =>
                                                    link.url &&
                                                    router.get(link.url, carry)
                                                }
                                            >
                                                {link.label}
                                            </Button>
                                        ))}

                                    {/* Next page */}
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0"
                                        onClick={() =>
                                            next_page &&
                                            router.get(next_page, carry)
                                        }
                                        disabled={!next_page}
                                    >
                                        <span className="sr-only">
                                            Go to next page
                                        </span>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>

                                    {/* Last page */}
                                    <Button
                                        variant="outline"
                                        className="hidden h-8 w-8 p-0 lg:flex"
                                        onClick={() =>
                                            lastPageUrl &&
                                            router.get(lastPageUrl, carry)
                                        }
                                        disabled={!next_page}
                                    >
                                        <span className="sr-only">
                                            Go to last page
                                        </span>
                                        <ChevronsRight className="h-4 w-4" />
                                    </Button>
                                </>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    );
}
