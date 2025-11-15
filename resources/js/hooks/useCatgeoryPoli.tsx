import { createContext, useContext, useState, type ReactNode } from 'react';

interface PoliContext {
    poli: string;
    setPoli: React.Dispatch<React.SetStateAction<string>>;
}

const PoliContext = createContext<PoliContext | undefined>(undefined);

export function PoliProvider({ children }: { children: ReactNode }) {
    const [poli, setPoli] = useState<string>('Umum');

    return (
        <PoliContext.Provider value={{ poli, setPoli }}>
            {children}
        </PoliContext.Provider>
    );
}

export function usePoli() {
    const context = useContext(PoliContext);
    if (!context) {
        throw new Error('usePoli must be used within a PoliProvider');
    }
    return context;
}
