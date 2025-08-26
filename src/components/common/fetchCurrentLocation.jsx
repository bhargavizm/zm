// utils/location.js
import toast from "react-hot-toast";

export const fetchCurrentLocation = async () => {
  if (!navigator.geolocation) {
    toast.warn("Geolocation is not supported by this browser.");
    return { mapLink: "" };
  }

  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    });

    const { latitude, longitude } = pos.coords;
    const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return { mapLink };
  } catch (err) {
    console.error("Error fetching current location:", err.message);
    toast.error("Could not fetch current location. Please enter manually.");
    return { mapLink: "" };
  }
};
