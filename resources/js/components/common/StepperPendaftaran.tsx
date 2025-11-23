import { Check } from 'lucide-react';

export default function StepperPendaftaran({
    currentStep,
}: {
    currentStep: number;
}) {
    const steps = [
        { id: 1, name: 'Data Pasien' },
        { id: 2, name: 'Tujuan Poliklinik' },
        { id: 3, name: 'Cetak Antrian' },
    ];

    return (
        <div className="w-full py-4">
            <div className="flex items-center justify-center space-x-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                        {index !== 0 && (
                            <div
                                className={`mr-4 h-0.5 w-10 sm:w-20 ${
                                    step.id <= currentStep
                                        ? 'bg-primary'
                                        : 'bg-muted'
                                }`}
                            />
                        )}

                        <div className="relative flex flex-col items-center">
                            <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                                    step.id < currentStep
                                        ? 'border-primary bg-primary text-primary-foreground'
                                        : step.id === currentStep
                                          ? 'border-primary text-primary'
                                          : 'border-muted text-muted-foreground'
                                }`}
                            >
                                {step.id < currentStep ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    step.id
                                )}
                            </div>

                            <span
                                className={`absolute -bottom-6 text-xs font-medium whitespace-nowrap ${
                                    step.id <= currentStep
                                        ? 'text-foreground'
                                        : 'text-muted-foreground'
                                }`}
                            >
                                {step.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
