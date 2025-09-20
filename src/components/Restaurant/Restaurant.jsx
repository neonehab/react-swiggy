import RestaurantCard, {RestaurantCardWithBadges} from "./RestaurantCard";
import "../../css/restaurant.css";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import useAllRestaurantApi from "../../data/useRestaurantApis";

const Restaurants = () => {
  const { location } = useOutletContext();
  const { restaurants, loading, error } = useAllRestaurantApi(location);
  const [showTopRated, setShowTopRated] = useState(false);
  const ResCardWithBadgesComponent = RestaurantCardWithBadges(RestaurantCard);
  const visibleRestaurants = showTopRated
    ? restaurants.filter((restaurant) => Number(restaurant.info.avgRating) > 4.5)
    : restaurants;

  return (
    <div className="restaurant-list">
      <h2>Restaurants near {location.label}</h2>
      {location.error && (
        <p className="restaurant-status" role="status">
          Could not access your location. Showing results for the default
          location instead.
        </p>
      )}
      {error && (
        <p className="restaurant-status" role="alert">
          {error} Showing sample restaurants instead.
        </p>
      )}
      <button
        onClick={() => setShowTopRated((current) => !current)}
        disabled={loading}
      >
        {showTopRated ? "Show All" : "Top Rated"}
      </button>

      {loading ? (
        <p className="restaurant-status" role="status">
          Finding restaurants near you...
        </p>
      ) : visibleRestaurants.length === 0 ? (
        <p className="restaurant-status">No restaurants match this filter.</p>
      ) : (
        <div className="cards-container">
          {visibleRestaurants.map((restaurant) => {
            const resInfo = restaurant.info;
            return (
              <Link
                className="res-links"
                key={resInfo.id}
                to={`/restaurant-menu/${resInfo.id}`}
              >
                {resInfo.badges?.imageBadges?.length ? (
                  <ResCardWithBadgesComponent resDetails={resInfo} />
                ) : (
                  <RestaurantCard resDetails={resInfo} />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Restaurants;
