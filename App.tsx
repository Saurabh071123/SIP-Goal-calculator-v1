
import React, { useState, useCallback } from 'react';
import type { SipInputs } from './types';
import SipForm from './components/SipForm';
import ResultDisplay from './components/ResultDisplay';
import CalculatorIcon from './components/icons/CalculatorIcon';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<SipInputs>({
    targetCorpus: '10000000', // 1 Crore
    annualRate: '12',
    tenure: '180', // 15 years
    investmentTiming: 0,
  });
  const [monthlyInvestment, setMonthlyInvestment] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = useCallback((field: keyof SipInputs, value: string | number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  }, []);

  const calculateSip = useCallback(() => {
    setError(null);
    setIsLoading(true);

    // Simulate calculation time for better UX
    setTimeout(() => {
        const target = parseFloat(inputs.targetCorpus);
        const rate = parseFloat(inputs.annualRate);
        const periods = parseInt(inputs.tenure, 10);
        const timing = inputs.investmentTiming;

        if (isNaN(target) || isNaN(rate) || isNaN(periods) || target <= 0 || periods <= 0) {
            setError('Please enter valid, positive numbers for all fields.');
            setMonthlyInvestment(null);
            setIsLoading(false);
            return;
        }

        if (rate < 0) {
            setError('Interest rate cannot be negative.');
            setMonthlyInvestment(null);
            setIsLoading(false);
            return;
        }

        // Handle 0% interest rate case
        if (rate === 0) {
            setMonthlyInvestment(target / periods);
            setIsLoading(false);
            return;
        }

        const monthlyRate = rate / 12 / 100;
        const fvFactor = (Math.pow(1 + monthlyRate, periods) - 1) / monthlyRate;

        let requiredSip: number;
        if (timing === 1) { // Investment at the end of the month
            requiredSip = target / fvFactor;
        } else { // Investment at the beginning of the month
            requiredSip = target / (fvFactor * (1 + monthlyRate));
        }

        if (isFinite(requiredSip)) {
            setMonthlyInvestment(requiredSip);
        } else {
            setError('Calculation resulted in an invalid number. Please check your inputs.');
            setMonthlyInvestment(null);
        }
        setIsLoading(false);
    }, 500); // 500ms delay
  }, [inputs]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateSip();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-700">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3">
              <CalculatorIcon className="w-8 h-8 text-cyan-400" />
              <h1 className="text-3xl font-bold text-gray-100">SIP Goal Calculator</h1>
            </div>
            <p className="text-gray-400 mt-2">
              Estimate the monthly investment needed to reach your target corpus.
            </p>
          </div>
          <SipForm 
            inputs={inputs} 
            onInputChange={handleInputChange} 
            onSubmit={handleSubmit} 
            isLoading={isLoading} 
          />
          {(monthlyInvestment !== null || error) && (
             <ResultDisplay amount={monthlyInvestment} error={error} />
          )}
        </div>
         <footer className="text-center mt-6 text-gray-500 text-sm">
            <p>Calculations are for illustrative purposes only.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
