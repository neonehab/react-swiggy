import { useEffect, useState } from "react";
import { current_latitiude, current_longitude } from "./location";
import { getAllRestaurantAPI } from "./api";

const useAllRestaurantApi = () => {
  const [restaurantData, setRestaurantData] = useState([]);
  useEffect(() => {
    getRestaurantData();
  }, []);

  const getRestaurantData = async () => {
    const response = await fetch(
      getAllRestaurantAPI(current_latitiude, current_longitude)
    );
    const data = await response.json();
    setRestaurantData(data);
  };

  return restaurantData;
};

export default useAllRestaurantApi;
