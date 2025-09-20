import { useEffect, useState } from "react";
import { current_latitiude, current_longitude } from "./location";

const reverseGeocode = async (lat, lng) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14&addressdetails=1`
  );
  if (!res.ok) throw new Error("Reverse geocoding failed");
  const data = await res.json();
  const a = data.address || {};
  const area =
    a.suburb || a.neighbourhood || a.village || a.town || a.city_district;
  const city = a.city || a.town || a.state_district || a.state;
  return [area, city].filter(Boolean).join(", ") || data.display_name;
};

const useCurrentLocation = () => {
  const [location, setLocation] = useState({
    lat: current_latitiude,
    lng: current_longitude,
    label: "Detecting location...",
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    const resolve = async (lat, lng, error = null) => {
      let label;
      try {
        label = await reverseGeocode(lat, lng);
      } catch {
        label = `${Number(lat).toFixed(4)}, ${Number(lng).toFixed(4)}`;
      }
      if (!cancelled) setLocation({ lat, lng, label, loading: false, error });
    };

    if (!navigator.geolocation) {
      resolve(current_latitiude, current_longitude, "Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => resolve(pos.coords.latitude, pos.coords.longitude),
      (err) => resolve(current_latitiude, current_longitude, err.message),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return location;
};

export default useCurrentLocation;
