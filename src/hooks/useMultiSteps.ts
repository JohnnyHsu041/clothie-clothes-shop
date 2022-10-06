import { useState, useCallback, useEffect } from "react";

type MultiStepsFunc = (
    initStep: number,
    totalSteps: number
) => [
    currentStep: number,
    isFirstStep: boolean,
    isLastStep: boolean,
    nextStep: () => void,
    prevStep: () => void
];

const useMultiSteps: MultiStepsFunc = (initStep, totalSteps) => {
    const [currentStep, setCurrentStep] = useState(initStep);
    const [isFirstStep, setIsFirstStep] = useState(true);
    const [isLastStep, setIsLastStep] = useState(false);

    const nextStep = useCallback(() => {
        if (currentStep >= totalSteps) return;
        setCurrentStep((prev) => prev + 1);
    }, [currentStep, totalSteps]);

    const prevStep = useCallback(() => {
        if (currentStep <= initStep) return;
        setCurrentStep((prev) => prev - 1);
    }, [currentStep, initStep]);

    useEffect(() => {
        if (currentStep === initStep) {
            setIsFirstStep(true);
            setIsLastStep(false);
        } else if (currentStep === totalSteps) {
            setIsLastStep(true);
            setIsFirstStep(false);
        } else {
            setIsFirstStep(false);
            setIsLastStep(false);
        }
    }, [currentStep, initStep, totalSteps]);

    return [currentStep, isFirstStep, isLastStep, nextStep, prevStep];
};

export default useMultiSteps;
