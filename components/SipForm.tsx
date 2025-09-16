
import React from 'react';
import type { SipInputs } from '../types';

interface SipFormProps {
  inputs: SipInputs;
  onInputChange: (field: keyof SipInputs, value: string | number) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const InputField: React.FC<{
  id: keyof SipInputs;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  unit?: string;
  type?: string;
}> = ({ id, label, value, onChange, placeholder, unit, type = 'number' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min="0"
        className="w-full bg-gray-700 border border-gray-600 rounded-md py-2.5 px-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
      />
      {unit && <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">{unit}</span>}
    </div>
  </div>
);

const InvestmentTimingToggle: React.FC<{
  value: 0 | 1;
  onChange: (value: 0 | 1) => void;
}> = ({ value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      Investment Timing
    </label>
    <div className="relative flex w-full p-1 bg-gray-700 rounded-lg">
      <span
        className={`absolute top-1 bottom-1 left-1 w-1/2 rounded-md bg-cyan-600 shadow-lg transform transition-transform duration-300 ease-in-out ${
          value === 0 ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: 'calc(50% - 4px)'}}
      ></span>
      <button
        type="button"
        onClick={() => onChange(0)}
        className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-md transition-colors ${value === 0 ? 'text-white' : 'text-gray-300'}`}
      >
        Beginning of Month
      </button>
      <button
        type="button"
        onClick={() => onChange(1)}
        className={`w-1/2 relative z-10 py-2 text-sm font-semibold rounded-md transition-colors ${value === 1 ? 'text-white' : 'text-gray-300'}`}
      >
        End of Month
      </button>
    </div>
  </div>
);


const SipForm: React.FC<SipFormProps> = ({ inputs, onInputChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <InputField
        id="targetCorpus"
        label="Target Amount"
        value={inputs.targetCorpus}
        onChange={(val) => onInputChange('targetCorpus', val)}
        placeholder="e.g., 1000000"
        unit="₹"
      />
      <InputField
        id="annualRate"
        label="Expected Annual Return"
        value={inputs.annualRate}
        onChange={(val) => onInputChange('annualRate', val)}
        placeholder="e.g., 12"
        unit="%"
      />
      <InputField
        id="tenure"
        label="Investment Tenure"
        value={inputs.tenure}
        onChange={(val) => onInputChange('tenure', val)}
        placeholder="e.g., 120"
        unit="Months"
      />
      <InvestmentTimingToggle 
        value={inputs.investmentTiming} 
        onChange={(val) => onInputChange('investmentTiming', val)} 
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isLoading ? (
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          'Calculate'
        )}
      </button>
    </form>
  );
};

export default SipForm;
