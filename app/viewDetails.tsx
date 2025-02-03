"use client";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  totalDeductions: number;
  totalTax: number;
  pfDeduction: number;
  onClose: () => void;
}

export default function Modal({ isOpen, totalDeductions,totalTax,pfDeduction, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">Deductions BreakDown</h2>
          <button onClick={onClose} className="text-gray-500  hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center transition">
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-[#e76f51]">Total Tax</p>
            <p className="text-[#264653] font-bold">₹{Math.round(totalTax)}</p>
          </div>
          <div>
            <p className="text-[#e9c46a]">PF Deduction</p>
            <p className="text-[#264653] font-bold">₹{Math.round(pfDeduction)}</p>
          </div>
          <div>
            <p className="text-[#2a9da4]">Professional Tax</p>
            <p className="text-[#264653] font-bold">₹2500</p>
          </div>
          <div>
            <p className="text-red-600">Total Deduction</p>
            <p className="text-[#264653] font-bold">₹{Math.round(totalDeductions)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
