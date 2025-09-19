import RestaurantCard, {RestaurantCardWithBadges} from "./RestaurantCard";
import "../../css/restaurant.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAllRestaurantApi from "../../data/useRestaurantApis";

const Restaurants = () => {
  const [btnName, setbtnName] = useState("Top Rated");
  const [resData, setResData] = useState([]);

  const apiResponse = useAllRestaurantApi();
  const ResCardWithBadgesComponent = RestaurantCardWithBadges(RestaurantCard);

  useEffect(() => {
    const restaurantlist =
      apiResponse?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;
    if (restaurantlist) {
      setResData(restaurantlist);
    }
    console.log(restaurantlist);
  }, [apiResponse]);

  // let resData = restaurants;
  const filter = () => {
    if (btnName == "Top Rated") {
      const filteresResData = resData.filter((res) => {
        return res.info.avgRating > 4.5;
      });

      setResData(filteresResData);
      setbtnName("Show All");
    } else {
      const restaurantlist =
        apiResponse?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      setResData(restaurantlist);
      setbtnName("Top Rated");
    }
  };
  return !resData ? (
    <h2>Loading....</h2>
  ) : (
    <div className="restaurant-list">
      <h2>Restaurants</h2>
      <button onClick={filter}>{btnName}</button>

      <div className="cards-container">
        {resData.map((res) => {
          const resInfo = res.info;
          return (
            <Link
              className="res-links"
              key={resInfo.id}
              to={`/restaurant-menu/${resInfo.id}`}
            >
              {resInfo.badges?.imageBadges ? <ResCardWithBadgesComponent resDetails={resInfo}></ResCardWithBadgesComponent>
                : <RestaurantCard resDetails={resInfo}></RestaurantCard>

              }
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Restaurants;
