"use client";
import { useState } from "react";

export default function Invite() {
  const [method, setMethod] = useState("email"); // email or phone
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, email, phone }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("✅ Invite sent successfully!");
        setEmail("");
        setPhone("");
      } else {
        setStatus("❌ Failed: " + data.error);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Invite a Friend</h1>
      <form onSubmit={handleInvite} className="space-y-4 max-w-md">
        {/* Method Selector */}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="email">Send via Email</option>
          <option value="phone">Send via SMS</option>
        </select>

        {/* Email Input */}
        {method === "email" && (
          <input
            type="email"
            placeholder="Enter recipient email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        )}

        {/* Phone Input */}
        {method === "phone" && (
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border rounded-md"
          />
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-mainGreen text-white rounded-md cursor-pointer hover:font-bold transition-effects"
        >
          Send Invite
        </button>
      </form>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
}
