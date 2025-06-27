"use client";
import React from "react";

export default function not_found() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-800 via-indigo-900 to-blue-900 text-white p-4 font-inter">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold mb-4 animate-float-spin-bounce">
          404
        </h1>
        <h2 className="text-4xl font-bold mb-6 text-indigo-200">
          Page Not Found
        </h2>
        <p className="text-lg mb-8 text-indigo-300">
          Oops! It looks like you've wandered into uncharted digital territory.
        </p>
        <a
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Go Back Home
        </a>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap");

        .font-inter {
          font-family: "Inter", sans-serif;
        }

        @keyframes floatSpinBounce {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          25% {
            transform: translateY(-20px) rotate(5deg) scale(1.05);
            opacity: 0.95;
          }
          50% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          75% {
            transform: translateY(-10px) rotate(-5deg) scale(1.02);
            opacity: 0.98;
          }
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
        }

        .animate-float-spin-bounce {
          animation: floatSpinBounce 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
