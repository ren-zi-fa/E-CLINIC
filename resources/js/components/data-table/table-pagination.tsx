import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/components/ui/pagination';
import { Link } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type PaginationLinkType = {
    url: string | null;
    label: string;
    active: boolean;
};

type TablePaginationProps = {
    links: PaginationLinkType[];
};

export default function TablePagination({ links }: TablePaginationProps) {
    if (!links || links.length === 0) return null;

    return (
        <div className="mt-4 flex justify-center">
            <Pagination>
                <PaginationContent>
                    {links.map((link, i) => {
                        // Deteksi "Previous" dan "Next"
                        if (link.label.includes('Previous')) {
                            return (
                                <PaginationItem
                                    key={i}
                                    className="rounded-2xl border p-2"
                                >
                                    <Link
                                        href={link.url || '#'}
                                        aria-disabled={!link.url}
                                        className={
                                            !link.url
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        }
                                    >
                                        <ChevronLeftIcon className="h-4 w-4" />
                                    </Link>
                                </PaginationItem>
                            );
                        }

                        if (link.label.includes('Next')) {
                            return (
                                <PaginationItem
                                    key={i}
                                    className="rounded-2xl border p-2"
                                >
                                    <Link
                                        href={link.url || '#'}
                                        aria-disabled={!link.url}
                                        className={
                                            !link.url
                                                ? 'pointer-events-none opacity-50'
                                                : ''
                                        }
                                    >
                                        <ChevronRightIcon className="h-4 w-4" />
                                    </Link>
                                </PaginationItem>
                            );
                        }

                        // Halaman angka
                        return (
                            <PaginationItem
                                key={i}
                             
                            >
                                <Link
                                    href={link.url || '#'}
                                    preserveScroll
                                    className={`rounded-md border px-3 py-1 ${
                                        link.active
                                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                                            : 'hover:bg-accent hover:text-accent-foreground'
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            </PaginationItem>
                        );
                    })}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
