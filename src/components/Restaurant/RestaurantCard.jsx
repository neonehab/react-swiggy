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
    <div className="res-card">
      <img
        src={resDetails.imageUrl || `${IMAGE_CDN}${cloudinaryImageId}`}
        alt={name}
      />
      <h3>{name}</h3>
      <p>{cuisines?.join(", ")}</p>
      <p>{costForTwo}</p>
      <p>{avgRating}</p>
      <p>
        {locality}, {areaName}
      </p>
    </div>
  );
};

export const RestaurantCardWithBadges = (ResCard) => {
  const enhacedResCardComponent = (props) => {
    const {badges} = props.resDetails;
    return <div style={{position: 'relative'}}> 
      <img className="badgeImage"  width="100" height="100" src={IMAGE_CDN + badges?.imageBadges[0].imageId} alt="Badges" />
       <ResCard {...props}></ResCard>
    </div>
  }
  return enhacedResCardComponent;
}

export default RestaurantCard;
