import { useEffect, useState } from "react";
import { current_latitiude, current_longitude } from "./location";
import { getMenuAPIURL } from "./api";

const useRestaurantMenuApi = (restaurantID) => {
  const [restaurantMenuData, setRestaurantMenuData] = useState([]);
  useEffect(() => {
    getRestaurantMeuData();
  }, []);

  const getRestaurantMeuData = async () => {
    const response = await fetch(
      getMenuAPIURL(current_latitiude, current_longitude, restaurantID)
    );
    const data = await response.json();
    setRestaurantMenuData(data);
  };

  return restaurantMenuData;
};

export default useRestaurantMenuApi;
