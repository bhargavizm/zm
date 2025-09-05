"use client";

import LoadingSpinner from "@/components/common/spinner";
import { useEffect, useRef, useState } from "react";

export default function GeoTracker({ targetUrl, code }) {
  const loggedRef = useRef(false); // prevent double log
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  useEffect(() => {
    const sendLog = async (payload) => {
      if (loggedRef.current) return;
      loggedRef.current = true;

      try {
        await fetch("/api/track-scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("Failed to send scan log:", err);
      } finally {
        window.location.href = targetUrl;
      }
    };

    const fetchCurrentLocation = async () => {
      setIsLoadingLocation(true);
      try {
        const position = await new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          })
        );

        const { latitude, longitude, accuracy } = position.coords;

        // 🔹 Use OpenStreetMap Nominatim for free reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const fullAddress = data.display_name || "Address not found";

        sendLog({
          code,
          lat: latitude,
          lon: longitude,
          accuracy,
          address: fullAddress, // send full address
        });
      } catch (error) {
        console.error("Location fetch failed:", error);
        // fallback to IP only
        sendLog({ code });
      } finally {
        setIsLoadingLocation(false);
      }
    };

    fetchCurrentLocation();
  }, [targetUrl, code]);

  return (
    <div className="flex items-center justify-center h-screen text-lg">
      <LoadingSpinner />
    </div>
  );
}
