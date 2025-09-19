import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAllRestaurantApi from "../../data/useRestaurantApis";
import useRestaurantMenuApi from "../../data/useRestaurantMenuAPis";
import MenuItem from "./MenuItem";
import RestaurantCategory from "./RestaurantCategory";
import restaurantsMenu from '../../data/restaurantsMenu.json';

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resData, setResData] = useState([]);
  const [showIndex, setShowIndex] = useState(0);

  // const resDetails = useRestaurantMenuApi(id);
  const resDetails = restaurantsMenu;
  const menuCategories =
    resDetails?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (item) =>
        item?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  const handleClick = (index) => {
    if(index === showIndex) {
      setShowIndex(null)
    } else {
      setShowIndex(index)
    } 
  };


  return menuCategories === undefined ? (
    <h2>Loading....</h2>
  ) : (
    <div>
      {menuCategories?.map((category, index) => {
        return (
              <RestaurantCategory 
              key={category.card.card.id}
                category={category.card.card}
                showContent={index === showIndex ? true : false}
                setShowIndex = {() => handleClick(index )}
              
              ></RestaurantCategory>
             
          
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
