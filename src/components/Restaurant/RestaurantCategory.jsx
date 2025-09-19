import React, { useState } from "react";
import MenuItem from "./MenuItem";

const RestaurantCategory = ({category, showContent, setShowIndex}) => {
  const { title, itemCards} = category;

  const toggleMenuContent = () => {
     setShowIndex()
  };

  return (
    <div className="res-category">
      <div className="header" onClick={toggleMenuContent}>
        <h3>{title} ({itemCards.length}) <span>🔽</span></h3>
      </div>

      <div>
        {itemCards?.map((item) => {
          const { name } = item.card.info;
          return showContent && <MenuItem key={name} {...item.card.info}></MenuItem>;
        })}
      </div>
    </div>
  );
};

export default RestaurantCategory;
