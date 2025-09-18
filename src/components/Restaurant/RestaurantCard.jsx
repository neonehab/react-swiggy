import "../../css/restaurant.css";
import { IMAGE_CDN } from "../../data/api";

const RestaurantCard = ({ resDetails }) => {
  const {
    name,
    cuisines,
    cloudinaryImageId,
    costForTwo,
    avgRating,
    areaName,
    locality,
  } = resDetails;
  return (
    <>
      <div className="res-card">
        <img src={`${IMAGE_CDN}/${cloudinaryImageId}`} alt="" />
        <h3>{name}</h3>
        <p>{cuisines.join(", ")}</p>
        <p>{costForTwo}</p>
        <p>{avgRating}</p>
        <p>
          {locality}, {areaName}
        </p>
      </div>
    </>
  );
};

export default RestaurantCard;
