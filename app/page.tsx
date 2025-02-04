'use client';
import dynamic from "next/dynamic";
import Head from "next/head";

const Modal = dynamic(() => import("./viewDetails"), { ssr: false });

import { useState,useEffect  } from 'react';
export default function Home() {
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [selected, setSelected] = useState('curr');
  const [basePay, setBasePay] = useState(0);
  const standardDeduction = 75000;
  const [pfDeduction, setPfDeduction] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const currYear = "FY 2025-26";
  const prevYear = "FY 2024-25";
  useEffect(() => {
    handleCalculate();  // Call calculation function with the updated toggle value
  }, [selected]);  // Dependency array: triggers when `isToggled` changes

  const handleCalculate = () => {
    try {
      if(basePay > 10000){
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
      }
      else{
        setValuesToInitialStates();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setValuesToInitialStates = () => {
    setMonthlyPayment(0);
    setTotalDeductions(0);
    setTotalTax(0);
    setPfDeduction(0);
  }

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
    if(income > 1200000){// rebate upto 1200000
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
    }
    return tax;
  }

  function totalTax2024(income:number){
    let tax = 0;
    if(income > 700000){// rebate upto 700000
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
    }
    return tax;
  }
  return (
    <>
    
      <Head>
        <title>In-Hand Salary Calculator India | Monthly Take-Home from CTC</title>
        <meta name="description" content="Calculate your in-hand salary from your CTC using our easy and accurate In-Hand Salary Calculator India. Get tax, PF, and take-home estimates instantly." />
        
        {/* ✅ FAQ Schema Markup for Rich Snippets */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yourdomain.com"
  },
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is in-hand salary calculated?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your in-hand salary is calculated after deducting income tax, provident fund (PF), and professional tax (PT) from your CTC."
      }
    },
    {
      "@type": "Question",
      "name": "How much will I take home from ₹20 LPA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For ₹20 LPA CTC, your estimated in-hand salary will be around ₹1,42,425 per month after deductions."
      }
    },
    {
      "@type": "Question",
      "name": "What are the deductions from salary in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Deductions from salary in India include income tax, provident fund (PF), professional tax (PT), and other statutory deductions."
      }
    },
    {
      "@type": "Question",
      "name": "What is the take-home salary for ₹12 LPA in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a ₹12 LPA CTC, your estimated monthly take-home salary will be around ₹94,992 after tax and deductions."
      }
    },
    {
      "@type": "Question",
      "name": "What is the in-hand salary for ₹25 LPA CTC?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For a ₹25 LPA CTC, the estimated in-hand salary will be approximately ₹1,71,475 per month after deductions."
      }
    }
  ]
}

        `}} />
      </Head>
    <main className=" flex flex-col justify-center items-center gap-2 max-sm:min-h-screen max-sm:bg-[#f1f3f6]">
      {/* ✅ Add H1 for SEO */}
      <h1 className="text-xl font-semibold text-[#264653]">
        In-Hand Salary Calculator
      </h1>

      {/* ✅ Add an H2 to target a secondary keyword */}
      <h2 className="text-md font-medium text-[#264653]">
        Calculate Your Salary After Tax & Deductions
      </h2>

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
              {currYear}
            </div>
            <div
              className={`relative z-10 flex-1 text-center text-[#264653] font-semibold transition-all duration-300 flex justify-center items-center ${
                selected === 'prev' ? 'text-white' : 'text-[#264653]'
              }`}
              onClick={() => setSelected('prev')}
            >
              {prevYear}
            </div>
          </div>
        </div>

        {/* Base Pay */}
        <div>
          <label className="block text-gray-600 font-medium text-lg">Annual Base Pay</label>
          <input
            type="number"
            min="10000" 
            value={basePay}
            onChange={(e) => {
              console.log("Base Pay", e.target.value);
              const value = (e.target.value.replace(/^0+/, "") || 0);
              if(Number(value) < 10000){
                setValuesToInitialStates();
              }
              setBasePay(value);
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
          disabled={basePay < 10000} // Disable the button if salary is less than 10,000
          className="w-full bg-[#2A9D8F] text-white py-4 rounded-lg text-xl font-bold shadow-lg disabled:bg-gray-400"
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
    </main>
    </>
  );
}
