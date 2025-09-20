import { useEffect, useState } from "react";
import { getAllRestaurantAPI } from "./api";
import fallbackRestaurants from "./fallbackRestaurants";

const findRestaurants = (data) => {
  const cards = data?.data?.cards;
  if (!Array.isArray(cards)) return [];

  for (const card of cards) {
    const cardData = card?.card?.card;
    const restaurants =
      cardData?.gridElements?.infoWithStyle?.restaurants ??
      cardData?.restaurants;
    if (Array.isArray(restaurants) && restaurants.length > 0) {
      return restaurants;
    }
  }

  return [];
};

const useAllRestaurantApi = (location) => {
  const [restaurantData, setRestaurantData] = useState({
    restaurants: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (location.loading || location.lat == null || location.lng == null) {
      return;
    }

    const controller = new AbortController();
    setRestaurantData((current) => ({ ...current, loading: true, error: null }));

    const getRestaurantData = async () => {
      try {
        const response = await fetch(
          getAllRestaurantAPI(location.lat, location.lng),
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error(`Restaurant request failed (${response.status})`);
        }

        const data = await response.json();
        const restaurants = findRestaurants(data);
        if (restaurants.length === 0) {
          throw new Error("No restaurant listings were returned.");
        }

        setRestaurantData({ restaurants, loading: false, error: null });
      } catch (error) {
        if (controller.signal.aborted) return;
        setRestaurantData({
          restaurants: fallbackRestaurants,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Unable to load restaurant listings.",
        });
      }
    };

    getRestaurantData();
    return () => controller.abort();
  }, [location.lat, location.lng, location.loading]);

  return restaurantData;
};

export default useAllRestaurantApi;
