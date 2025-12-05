import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function PasswordInput({
    label,
    value,
    onChange,
    name,
    placeholder = '******',
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    placeholder?: string;
}) {
    const [show, setShow] = useState(false);

    return (
        <div className="space-y-2">
            <Label htmlFor={name}>{label}</Label>

            <div className="relative">
                <Input
                    id={name}
                    name={name}
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="pr-10"
                    autoComplete='new-password'
                />

                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
                >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
}
