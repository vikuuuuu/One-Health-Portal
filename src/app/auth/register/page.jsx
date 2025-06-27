"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const required = [
    "firstName",
    "lastName",
    "email",
    "mobile",
    "password",
    "confirmPassword",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateStep2 = () => {
    const newErrors = {};
    required.forEach((field) => {
      if (!formData[field]) newErrors[field] = "This field is required";
    });
    if (!role) newErrors.role = "Please select a role";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    return newErrors;
  };

  const handleNext = () => {
    if (step === 2) {
      const err = validateStep2();
      if (Object.keys(err).length > 0) {
        setErrors(err);
        return;
      }
    }
    setErrors({});
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // Save logic...
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl shadow-xl bg-white p-3 rounded-2xl">
        {/* Header */}
        <div className="text-center pb-6">
          <h2 className="text-3xl font-bold text-gray-800 pb-2">Welcome!</h2>
          <h1 className="text-3xl font-bold text-gray-800">
            One Health Portal
          </h1>
          <p className="text-green-600 mt-2">Start your journey with us</p>

          {/* Step Indicator */}
          <div className="flex items-center justify-center mt-6">
            {[1, 2, 3].map((s, index) => (
              <React.Fragment key={s}>
                <div
                  className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${
                    step >= s ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  {s}
                </div>
                {index < 2 && (
                  <div
                    className={`h-1 w-10 md:w-24 ${
                      step > s ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleFinalSubmit} className="p-6 space-y-4">
          {step === 1 && (
            <div className="text-center space-y-6">
              <p className="text-gray-500">
                . Click below to create your account
              </p>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-3xl cursor-pointer"
              >
                Create Account
              </button>
            </div>
          )}

          {/* Step 2: Account Info */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-4">
                Create Your Account
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["firstName", "First Name"],
                  ["lastName", "Last Name"],
                  ["email", "Email"],
                  ["mobile", "Mobile"],
                  ["password", "Password"],
                  ["confirmPassword", "Confirm Password"],
                ].map(([name, label]) => (
                  <div key={name}>
                    <label>
                      {label} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type={
                        name.includes("password")
                          ? "password"
                          : name === "email"
                          ? "email"
                          : "text"
                      }
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className="input"
                    />
                    {errors[name] && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors[name]}
                      </p>
                    )}
                  </div>
                ))}
                <div className="col-span-2">
                  <label>
                    Registering As <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="input"
                  >
                    <option value="">Select Role</option>
                    <option value="patient">Patient</option>
                    <option value="hospital">Hospital</option>
                  </select>
                  {errors.role && (
                    <p className="text-sm text-red-500 mt-1">{errors.role}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold text-center mb-4">
                {role === "patient"
                  ? "Patient Details"
                  : "Hospital Registration"}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {role === "patient" && (
                  <>
                    <div className="col-span-2">
                      <label>
                        Father's Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        className="input"
                        placeholder="Father's Name"
                        required
                      />
                    </div>
                    <input
                      className="input"
                      placeholder="Mother's Name"
                      required
                    />
                    <input className="input" type="date" required />
                    <input
                      className="input"
                      placeholder="Occupation"
                      required
                    />
                    <input className="input" placeholder="City" required />
                    <input className="input" placeholder="District" required />
                    <input className="input" placeholder="State" required />
                    <input
                      className="input"
                      placeholder="Postal Code"
                      required
                    />
                    <textarea
                      className="input col-span-2"
                      placeholder="Full Address"
                      required
                    />
                  </>
                )}
                {role === "hospital" && (
                  <>
                    <input
                      className="input"
                      placeholder="Hospital Name"
                      required
                    />
                    <input
                      className="input"
                      placeholder="License Number"
                      required
                    />
                    <input className="input" placeholder="Website (optional)" />
                    <textarea
                      className="input col-span-2"
                      placeholder="Full Hospital Address"
                      required
                    />
                  </>
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-6 rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded"
                >
                  Create Account
                </button>
              </div>
            </>
          )}
        </form>
      </div>

      <style jsx>{`
        .input {
          padding: 0.65rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          width: 100%;
          margin-top: 4px;
          outline: none;
        }
        .input:focus {
          border-color: #2563eb;
        }
      `}</style>
    </div>
  );
}
