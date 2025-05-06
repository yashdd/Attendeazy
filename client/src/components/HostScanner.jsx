import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import toast from "react-hot-toast";

export default function HostQRScanner() {
  const scannerRef = useRef(null);
  const [scannedTicket, setScannedTicket] = useState(null);

  useEffect(() => {
    const html5QrCode = new Html5Qrcode("scanner");

    html5QrCode.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: 250
      },
      (decodedText) => {
        html5QrCode.stop();  
        handleScan(decodedText);
      },
      (err) => {
        console.warn("QR scan error:", err);
      }
    );

    return () => {
      html5QrCode.stop().catch(() => {});
    };
  }, []);

  const handleScan = async (text) => {
    console.log("Scanned:", text);
    const parts = text.split("|");

    if (parts[0] !== "attendeazy") return toast.error("Invalid QR");

    const eventId = parts[1]?.split(":")[1];
    const userId = parts[2]?.split(":")[1];
    const quantity = parseInt(parts[3]?.split(":")[1]);

    setScannedTicket({ eventId, userId, quantity });

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/tickets/mark-attended`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ userId, eventId }),
      });

      const data = await res.json();
      if (res.ok) toast.success("Marked as attended ✅");
      else toast.error(data.message || "Could not mark");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="pt-20 px-6 min-h-screen bg-gray-100">
        <h2 className="text-lg font-bold text-indigo-700 mb-4">Scanning for Event </h2>

      <h1 className="text-2xl font-bold mb-4">📷 QR Scanner (Host)</h1>
      <div id="scanner" ref={scannerRef} className="w-full max-w-md aspect-square mx-auto" />

      {scannedTicket && (
        <div className="mt-6 text-center">
          <p className="font-medium">Event ID: {scannedTicket.eventId}</p>
          <p>User ID: {scannedTicket.userId}</p>
          <p>🎟️ Quantity: {scannedTicket.quantity}</p>
        </div>
      )}
    </div>
  );
}
