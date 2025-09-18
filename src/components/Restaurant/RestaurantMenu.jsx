import React, { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAllRestaurantApi from "../../data/useRestaurantApis";
import useRestaurantMenuApi from "../../data/useRestaurantMenuAPis";
import MenuItem from "./MenuItem";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { id } = useParams();
  const [resData, setResData] = useState([]);

  const resDetails = useRestaurantMenuApi(id);
  const menuCategories =
    resDetails?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (item) =>
        item?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return menuCategories === undefined ? (
    <h2>Loading....</h2>
  ) : (
    <div>
      {menuCategories?.map((category) => {
        return (
          <Suspense fallback={<h3>Loading...</h3>}>
            <RestaurantCategory
              category={category.card.card}
            ></RestaurantCategory>
          </Suspense>
        );
      })}
    </div>
  );
};

export default RestaurantMenu;
