import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

type StatCardProps = {
    title: string;
    value: number | string;
    color?: string;
    icon?: LucideIcon;
};

export default function StatCard({
    title,
    value,
    color,
    icon: Icon,
}: StatCardProps) {
    return (
        <Card className="flex items-center justify-between p-4">
            <div>
                <CardHeader className="mb-2 p-0">
                    <CardTitle className="text-base font-semibold">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex items-center gap-4">
                    {Icon && (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            <Icon
                                className={`h-6 w-6 ${color ?? 'text-gray-600'}`}
                            />
                        </div>
                    )}
                    <p className={`text-3xl font-bold ${color ?? ''}`}>
                        {value}
                    </p>
                </CardContent>
            </div>
        </Card>
    );
}
