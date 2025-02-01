export default function Home() {
  const homePrice = 24974691;
  const downPayment = 20;
  const interestRate = 3.713;
  const propertyTax = 1.2;
  const loanAmount = homePrice * (downPayment / 100);
  const propertyTaxAmount = (homePrice * propertyTax) / 100;
  const monthlyPayment = 131208; // Static for now

  return (
    <div className="max-w-md mx-auto bg-white p-6 space-y-6">
      <div className="text-center bg-gray-100 p-4 rounded-lg relative h-32">
        <h2 className="text-gray-600 text-sm">Monthly Payment</h2>
        <p className="text-4xl font-semibold text-[#264653]">₹ {monthlyPayment.toLocaleString()}</p>
        <p className="text-gray-600 text-sm">Per Month</p>
        <button className="mt-2 bg-[#2A9D8F] text-white px-4 py-2 rounded-full shadow-md absolute left-1/2 transform -translate-x-1/2 -bottom-4">
          View Details
        </button>
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Home Price</label>
        <input
          type="number"
          defaultValue={homePrice}
          className="w-full border border-gray-300 rounded-lg p-3 text-lg font-semibold"
        />
      </div>

      <div className="flex space-x-2">
        <button className="flex-1 bg-[#2A9D8F] text-white py-3 rounded-lg text-lg font-semibold">
          30
        </button>
        <button className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg text-lg font-semibold">
          15
        </button>
        <button className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg text-lg font-semibold">
          Custom
        </button>
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Down Payment</label>
        <input
          type="range"
          min="0"
          max="85"
          defaultValue={downPayment}
          className="w-full accent-[#2A9D8F]"
        />
        <p className="text-center bg-white shadow-md p-2 rounded-lg bg-[#2A9D8F] font-semibold">
          {downPayment}% - ₹{loanAmount.toLocaleString()}
        </p>
      </div>

      <div>
        <label className="block text-gray-700 font-medium">Interest Rate</label>
        <input
          type="range"
          min="0"
          max="20"
          step="0.01"
          defaultValue={interestRate}
          className="w-full accent-[#2A9D8F]"
        />
        <p className="text-center bg-white shadow-md p-2 rounded-lg bg-[#2A9D8F] font-semibold">
          {interestRate}%
        </p>
      </div>
      <div></div>
      <div>
        <label className="block text-gray-700 font-medium">Property Taxes/Year</label>
        <input
          type="range"
          min="0"
          max="3"
          step="0.1"
          defaultValue={propertyTax}
          className="w-full accent-[#2A9D8F]"
        />
        <p className="text-center bg-white shadow-md p-2 rounded-lg bg-[#2A9D8F] font-semibold">
          {propertyTax}% - ₹{propertyTaxAmount.toLocaleString()}
        </p>
      </div>

      <button className="w-full bg-[#2A9D8F] text-white py-4 rounded-lg text-xl font-bold shadow-lg">
        Calculate
      </button>
    </div>
  );
}
