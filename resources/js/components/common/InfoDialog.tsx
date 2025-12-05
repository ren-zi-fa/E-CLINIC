import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

type AlertInfoProps = {
    title?: string;
    data: Record<string, string | number>;
    children?: ReactNode;
};

export function InfoDialog({
    title = 'Informasi',
    data,
    children,
}: AlertInfoProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center">{title}</DialogTitle>
                    <DialogDescription asChild>
                        <div className="mt-4 flex flex-col items-center">
                            <div className="mt-5 w-full space-y-1 rounded-lg border bg-muted/40 p-4">
                                {Object.entries(data).map(([key, value]) => (
                                    <p key={key}>
                                        <strong>{formatLabel(key)}:</strong>{' '}
                                        {value}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose>
                        <Button>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function formatLabel(key: string) {
    return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
