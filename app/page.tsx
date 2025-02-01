'use client';
import { useState } from 'react';
export default function Home() {
  const homePrice = 24974691;
  const downPayment = 20;
  const interestRate = 3.713;
  const propertyTax = 1.2;
  const loanAmount = homePrice * (downPayment / 100);
  const propertyTaxAmount = (homePrice * propertyTax) / 100;
  const monthlyPayment = 131208; // Static for now
  const [selected, setSelected] = useState('curr');

  return (
    <div className=" flex flex-col justify-center items-center gap-2 max-sm:min-h-screen max-sm:bg-[#f1f3f6]">
      <h1 className="mt-4">Monthly Take Home Salary Calculator</h1>
      <div className="bg-[#f1f3f6] lg:h-[70%] max-sm:min-h-screen max-w-md mx-auto shadow-lg lg:rounded-2xl p-6 space-y-6 lg:border lg:border-gray-200">
        <div className="text-center bg-[#fcfbfe] p-4 rounded-lg relative h-40 flex flex-col gap-2 shadow-xl">
          <h2 className="text-gray-600 text-sm">Monthly Payment</h2>
          <p className="text-4xl font-semibold text-[#264653]">
            ₹ {monthlyPayment.toLocaleString()}
            <sup>*</sup>
          </p>
          <p className="text-gray-600 text-sm">Per Month</p>
          <button className="mt-2 bg-[#2A9D8F] text-white px-4 py-2 rounded-full shadow-md absolute left-1/2 transform -translate-x-1/2 -bottom-4">
            View Details
          </button>
        </div>
        <div className="flex justify-center items-center !mt-10">
          <div className="relative w-full max-w-xs h-12 bg-white border border-gray-400 rounded-full flex items-center p-1 cursor-pointer sm:max-w-sm md:max-w-md lg:max-w-lg">
            {/* Toggle Background */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-[#2A9D8F] rounded-full transition-all duration-300 ${
                selected === 'curr' ? 'translate-x-0' : 'translate-x-full'
              }`}
            ></div>

            {/* Options */}
            <div
              className={`relative z-10 flex-1 text-center text-[#264653] font-semibold transition-all duration-300 flex justify-center items-center ${
                selected === 'curr' ? 'text-white' : 'text-[#264653]'
              }`}
              onClick={() => setSelected('curr')}
            >
              FY 2025-26
            </div>
            <div
              className={`relative z-10 flex-1 text-center text-[#264653] font-semibold transition-all duration-300 flex justify-center items-center ${
                selected === 'prev' ? 'text-white' : 'text-[#264653]'
              }`}
              onClick={() => setSelected('prev')}
            >
              FY 2024-25
            </div>
          </div>
        </div>

        {/* Base Pay */}
        <div>
          <label className="block text-gray-600 font-medium text-lg">Base Pay</label>
          <input
            type="number"
            defaultValue={homePrice}
            className="w-full border border-gray-400 rounded-lg p-3 text-lg font-semibold h-10 bg-[#f1f3f6] text-[#264653]"
          />
        </div>

        <button className="w-full bg-[#2A9D8F] text-white py-4 rounded-lg text-xl font-bold shadow-lg">
          Calculate
        </button>
        <p className="text-sm">
          *The salary calculations provided on this website are for informational purposes only and
          do not constitute financial, tax, or legal advice. Users are encouraged to verify all
          calculations independently and consult with a qualified professional for personalized
          advice. The website owner assumes no liability for any errors, omissions, or financial
          decisions made based on these calculations.
        </p>
      </div>
    </div>
  );
}
