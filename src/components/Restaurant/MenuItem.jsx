import React from "react";
import { IMAGE_CDN } from "../../data/api";

const MenuItem = (props) => {
  const { name, price, imageId } = props;
  return <div className="menu-flex">

    <h3>{name}- Rs.{price / 100}</h3>
    <img width="40" src={IMAGE_CDN + imageId } alt="" />
  </div>;
};

export default MenuItem;
