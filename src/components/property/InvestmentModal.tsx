import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InvestmentModalProps {
  property: { minInvestment: number; title?: string };
  open: boolean;
  onClose: () => void;
  initialAmount?: string;
}

const InvestmentModal = ({ property, open, onClose, initialAmount }: InvestmentModalProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    amount: initialAmount || property.minInvestment,
  });
  const [errors, setErrors] = useState<any>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        email: "",
        contact: "",
        amount: initialAmount || property.minInvestment,
      });
      setErrors({});
      setSuccessMsg("");
    }
  }, [open, property.minInvestment, initialAmount]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Name is required";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Email is invalid";
      case "contact":
        return /^\d{10}$/.test(value) ? "" : "Contact must be exactly 10 digits";
      case "amount":
        return Number(value) >= property.minInvestment
          ? ""
          : `Minimum investment is ₹${property.minInvestment.toLocaleString()}`;
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async () => {
    const newErrors: any = {};
    Object.keys(form).forEach((key) => {
      const err = validateField(key, (form as any)[key]);
      if (err) newErrors[key] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      const res = await fetch("http://localhost:8000/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          contact_number: form.contact,
          amount: Number(form.amount),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        else setErrors({ general: data.message || "Something went wrong" });
      } else {
        setSuccessMsg("✅ Investment request submitted successfully!");
        setForm({
          name: "",
          email: "",
          contact: "",
          amount: property.minInvestment,
        });
        setTimeout(() => {
          onClose();
          setSuccessMsg("");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setErrors({ general: "Network error, try again later" });
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-3xl p-10 animate-fadeIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-primary text-2xl"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Invest in{" "}
          <span className="text-primary">{property.title || "Property"}</span>
        </h2>

        {/* Success / Errors */}
        {successMsg && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-6 text-center text-lg">
            {successMsg}
          </div>
        )}
        {errors.general && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.general}</p>
        )}

        {/* Form */}
        <div className="space-y-5">
          {["name", "email", "contact", "amount"].map((field) => (
            <div key={field}>
              <Input
                name={field}
                type={field === "amount" ? "number" : field === "contact" ? "tel" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={(form as any)[field]}
                onChange={handleChange}
                maxLength={field === "contact" ? 10 : undefined}
                className="bg-gray-50 rounded-xl p-5 shadow-inner text-lg"
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="px-10 py-5 text-lg rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
          >
            {loading ? "Submitting..." : "Invest Now"}
          </Button>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10 text-gray-600">
          <div className="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-primary mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M4 6h16l-8-4-8 4zM4 10v10h16V10" />
            </svg>
            <p className="font-semibold text-lg">Secure Platform</p>
            <p className="text-sm">Your investment is safe & verified</p>
          </div>

          <div className="flex flex-col items-center text-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-14 h-14 text-primary mb-3"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    {/* Shield */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 1l9 4v6c0 5-3.5 9.7-9 11-5.5-1.3-9-6-9-11V5l9-4z"
    />
    {/* Checkmark centered in shield */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4"
    />
  </svg>
  <p className="font-semibold text-lg">Trusted by Investors</p>
  <p className="text-sm">Thousands already invested with us</p>
</div>

          <div className="flex flex-col items-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-14 text-primary mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3c-1.5 0-3 .7-3 2 0 .7.3 1.3.8 1.7A5 5 0 006 12c0 4 3 7 6 7s6-3 6-7a5 5 0 00-3.8-5.3c.5-.4.8-1 .8-1.7 0-1.3-1.5-2-3-2z"
              />
            </svg>
            <p className="font-semibold text-lg">Min Investment</p>
            <p className="text-sm">
              ₹{property.minInvestment.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* 🎉 Success Popup Box */}
      {successMsg && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="bg-white border-4 border-green-500 rounded-2xl shadow-2xl w-[90%] max-w-md p-8 text-center animate-fadeIn">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Congratulations!</h2>
            <p className="text-gray-700 text-lg">{successMsg}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentModal;
