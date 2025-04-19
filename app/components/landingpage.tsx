"use client";
import { useState } from "react";

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    "Industry Experts",
    "Dedicated Team",
    "Outcome Focused",
    "High Quality Service",
    "Cyber Security Expert",
  ];

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Why Choose Us</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          We Are Different From Others
        </h2>
        <p className="text-gray-500 max-w-4xl mx-auto px-4">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Ipsa
          cupiditate accusantium recusandae soluta explicabo hic!
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-60">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          {/* <img
            src="https://via.placeholder.com/320"
            alt="Why Choose Us"
            className="w-full h-full object-cover rounded-full"
          /> */}
          <div className="absolute top-10 left-0 w-48 h-48 md:w-80 md:h-80 z-50 bg-pink-900 opacity-70 rounded-full flex flex-col items-center justify-center p-4">
            <p className="text-white text-md font-semibold text-center">
              INDUSTRY EXPERTS
            </p>
            <p className="text-white text-sm text-start mt-2">
              Lorem ipsum dolor sit amet adipiscing elit. Quas dolores nam ipsum
              odit quod fuga numquam hic quol!
            </p>
          </div>
          <div className="absolute top-10 left-24 md:left-40 w-48 h-48 md:w-80 md:h-80 z-40 bg-gray-300 opacity-50 rounded-full"></div>
        </div>

        <div className="flex flex-col gap-6 mt-4 items-center justify-center h-auto md:h-80">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center px-6 py-2 rounded-full cursor-pointer w-72 md:w-96 ${
                index === currentFeature
                  ? "bg-pink-800 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => setCurrentFeature(index)}
            >
              <button
                onClick={prevFeature}
                className="text-xl"
                disabled={index !== currentFeature}
              >
                &lt;
              </button>
              <div className="flex-1 flex justify-end items-center gap-2">
                <span className="text-md font-bold">{feature}</span>
                <button
                  onClick={nextFeature}
                  className="text-xl"
                  disabled={index !== currentFeature}
                ></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
