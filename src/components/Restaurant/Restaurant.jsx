import RestaurantCard from "./RestaurantCard";
import "../../css/restaurant.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAllRestaurantApi from "../../data/useRestaurantApis";

const Restaurants = () => {
  const [btnName, setbtnName] = useState("Show");

  const resData =
    useAllRestaurantApi()?.data?.cards[4]?.card?.card?.gridElements
      ?.infoWithStyle?.restaurants;

  // let resData = restaurants;
  const filter = () => {
    const filteresResData = resData.filter((res) => {
      return res.rating > 4;
    });

    setResData(filteresResData);
  };
  return !resData ? (
    <h2>Loading....</h2>
  ) : (
    <div className="restaurant-list">
      <h2>Restaurants</h2>
      <button onClick={filter}>Top Rated</button>
      <button onClick={() => setbtnName("Filtered Data")}>{btnName}</button>

      <div className="cards-container">
        {resData.map((res) => {
          const resInfo = res.info;
          return (
            <Link
              className="res-links"
              key={resInfo.id}
              to={`/restaurant-menu/${resInfo.id}`}
            >
              <RestaurantCard resDetails={resInfo}></RestaurantCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Restaurants;
