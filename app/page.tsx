'use client';
import { useState } from 'react';
import Modal from "./viewDetails";
export default function Home() {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [selected, setSelected] = useState('curr');
  const [basePay, setBasePay] = useState(0);
  const standardDeduction = 75000;
  const [pfDeduction, setPfDeduction] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const handleCalculate = () => {
    try {
      let tax = taxCalulationWithSurcharge(basePay-standardDeduction);
      tax *= 1.04;//Adding health & cess
      const pfDeduction = Math.round(basePay * 0.4 * 0.12);
      setPfDeduction(pfDeduction);
      setTotalTax(tax);
      const totalDeductions = tax + pfDeduction + 2500;
      setTotalDeductions(totalDeductions);
      console.log('tax pf',tax, pfDeduction);
      const monthlyInhand = Math.round((basePay - totalDeductions) / 12);
      setMonthlyPayment(monthlyInhand);
    } catch (error) {
      console.error(error);
    }
  };

  function taxCalulationWithSurcharge(taxableIncome:number){
    let tax = selected==='curr'?totalTax2025(taxableIncome):totalTax2024(taxableIncome);
    if(taxableIncome > 20000000){
      const taxOn2Cr = taxCalulationWithSurcharge(20000000);
      const amtAbove2Cr = taxableIncome - 20000000;
      if(amtAbove2Cr< (tax*1.25- taxOn2Cr)){
        tax = taxOn2Cr + amtAbove2Cr;
      }
      else{
        tax=tax*1.25;
      }
    }
    else if(taxableIncome > 10000000){
      const taxOn1Cr = taxCalulationWithSurcharge(10000000);
      const amtAbove1Cr = taxableIncome - 10000000;
      if(amtAbove1Cr< (tax*1.15- taxOn1Cr)){
        tax = taxOn1Cr + amtAbove1Cr;
      }
      else{
        tax=tax*1.15;
      }
    }
    else if(taxableIncome> 5000000) {
        let taxOn50 = selected==='curr'?totalTax2025(5000000):totalTax2024(5000000);
        const amountAbove50Lakhs = taxableIncome - 5000000;
        if(amountAbove50Lakhs < (tax*1.1 - taxOn50)){
            tax = taxOn50 + amountAbove50Lakhs;
        }
        else
            tax *=1.1;
    }
    return tax;
  }

  function totalTax2025(income:number){
    let tax = 0;
    if (income > 2400000) {
      tax += (income - 2400000) * 0.3;
      income = 2400000;
    }
    if (income > 2000000) {
      tax += (income - 2000000) * 0.25;
      income = 2000000;
    }
    if (income > 1600000) {
      tax += (income - 1600000) * 0.20;
      income = 1600000;
    }
    if (income > 1200000) {
      tax += (income - 1200000) * 0.15;
      income = 1200000;
    }
    if (income > 800000) {
      tax += (income - 800000) * 0.1;
      income = 800000;
    }
    if (income > 400000) {
      tax += (income - 400000) * 0.05;
    }
    return tax;
  }

  function totalTax2024(income:number){
    let tax = 0;
    if (income > 1500000) {
      tax += (income - 1500000) * 0.3;
      income = 1500000;
    }
    if (income > 1200000) {
      tax += (income - 1200000) * 0.2;
      income = 1200000;
    }
    if (income > 1000000) {
      tax += (income - 1000000) * 0.15;
      income = 1000000;
    }
    if (income > 700000) {
      tax += (income - 700000) * 0.1;
      income = 700000;
    }
    if (income > 300000) {
      tax += (income - 300000) * 0.05;
    }
    return tax;
  }
  return (
    <div className=" flex flex-col justify-center items-center gap-2 max-sm:min-h-screen max-sm:bg-[#f1f3f6]">
      <div className="mt-4 text-xl font-medium">Monthly Take Home Salary Calculator</div>
      <div className="bg-[#f1f3f6] lg:h-[70%] max-sm:min-h-screen max-w-md mx-auto shadow-lg lg:rounded-2xl p-6 space-y-6 lg:border lg:border-gray-200">
        <div className="text-center max-sm:bg-[#fff] bg-[#fcfbfe] p-4 rounded-lg relative h-40 flex flex-col gap-2 shadow-xl">
          <h2 className="text-gray-600 text-sm">Monthly Payment</h2>
          <p className="text-4xl font-semibold text-[#264653]">
            ₹ {monthlyPayment.toLocaleString()}
            <sup>*</sup>
          </p>
          <p className="text-gray-600 text-sm">Per Month</p>
          <button className="mt-2 bg-[#2A9D8F] text-white px-4 py-2 rounded-full shadow-md absolute left-1/2 transform -translate-x-1/2 -bottom-4"
           onClick={() => setIsModalOpen(true)}
          >
            View Details
          </button>
          {/* Modal Popup */}
          <Modal isOpen={isModalOpen} totalDeductions={totalDeductions} totalTax={totalTax} pfDeduction={pfDeduction} onClose={() => setIsModalOpen(false)} />
        </div>
        <div className="flex justify-center items-center !mt-10">
          <div className="relative w-[60%] max-w-xs h-10 bg-white border border-gray-400 rounded-full flex items-center p-1 cursor-pointer sm:max-w-sm md:max-w-md lg:max-w-lg">
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
            value={basePay}
            onChange={(e) => {
              console.log("Base Pay", e.target.value);
              setBasePay((e.target.value.replace(/^0+/, "")));
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCalculate();
              }
            }}
            className="w-full border border-gray-400 rounded-lg p-3 text-lg font-semibold h-10 bg-[#f1f3f6] text-[#264653]"
          />
        </div>

        <button
          className="w-full bg-[#2A9D8F] text-white py-4 rounded-lg text-xl font-bold shadow-lg"
          onClick={handleCalculate}
        >
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
