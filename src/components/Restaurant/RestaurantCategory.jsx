import React, { useState } from "react";
import MenuItem from "./MenuItem";

const RestaurantCategory = (props) => {
  const { title, itemCards } = props.category;
  const [showContent, setshowContent] = useState(false);

  const toggleMenuContent = () => {
    setshowContent(!showContent);
  };

  return (
    <div className="res-category">
      <div className="header" onClick={toggleMenuContent}>
        <h3>{title}</h3>
      </div>

      <div>
        {itemCards?.map((item) => {
          const { name } = item.card.info;
          return showContent && <MenuItem key={name} name={name}></MenuItem>;
        })}
      </div>
    </div>
  );
};

export default RestaurantCategory;
