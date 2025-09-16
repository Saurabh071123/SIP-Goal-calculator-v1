
import React from 'react';

interface ResultDisplayProps {
  amount: number | null;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ amount, error }) => {
  const hasResult = amount !== null && amount > 0 && !error;
  const hasError = error !== null;

  return (
    <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg text-center transition-all duration-300 ease-in-out">
      {hasError ? (
        <p className="text-red-400 font-medium">{error}</p>
      ) : hasResult ? (
        <>
          <p className="text-gray-300 text-lg">You need to invest monthly:</p>
          <p className="text-4xl font-bold text-cyan-400 mt-2 tracking-tight">
            ₹
            {amount.toLocaleString('en-IN', {
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-gray-400 text-sm mt-1">to achieve your financial goal.</p>
        </>
      ) : (
        <p className="text-gray-400">Enter your details to see the required monthly SIP.</p>
      )}
    </div>
  );
};

export default ResultDisplay;
