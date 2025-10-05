import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";


export default function ProductCard({ product }) {
  const { name, price, images, popularityScore } = product;
  const [selectedColor, setSelectedColor] = useState("yellow");


  let pop = popularityScore ?? 0;
  if (pop > 1) pop = pop / 100;
  const popularity5 = +(pop * 5).toFixed(1);

  const colorLabelMap = {
    yellow: "Yellow Gold",
    white: "White Gold",
    rose: "Rose Gold"
  };

  const colorBgMap = {
    yellow: "#E6CA97",
    white: "#D9D9D9",
    rose: "#E1A4A9"
  };

  const renderStars = (value) => {
  const fullStars = Math.floor(value);
  const halfStar = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
  <div className ="flex items-center gap-2">
    <div className="flex items-center">
     
      {[...Array(fullStars)].map((_, i) => (
  <FontAwesomeIcon
    key={`f${i}`}
    icon={solidStar}
    className="text-lg"
    style={{ color: " #E6CA97" }}  
    //full sarı
  />
))}
{halfStar && (
  <FontAwesomeIcon
    icon={faStarHalfAlt}
    className="text-lg"
    style={{ color: " #E6CA97" }} // sarı yarım
  />
)}
{[...Array(emptyStars)].map((_, i) => (
  <FontAwesomeIcon
    key={`e${i}`}
    icon={regularStar}
    className="text-lg"
    style={{ color: "#D9D9D9" }} // boş gri 
  /> 
  
))}

    </div>

    {/* popularity rating = avenir book 14*/}
    <div className="font-avenir text-[14px] font-normal text-gray-600">
      {value}/5
    </div>
  </div>
);

};


  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col items-start text-left">
      {/* image */}
      <div className="product-image-wrapper mb-4 w-6-60 h-60 flex-shrink-0">
        <img
          src={images[selectedColor]}
          alt={name}
          className="w-full h-full object-contain rounded-[10%] mx-auto"
        />
      </div>

      {/* product title = montserrat medium 15 */}
      <h3 className="font-montserrat text-[15px] font-medium text-gray-800 mb-1">
        {name}
      </h3>

      {/* product price = montserrat regular 15 */}
      <p className="font-montserrat text-[15px] font-normal text-gray-800 mb-3 flex items-baseline">
        {/* price */}
      <i id="dolar" className="fa-regular fa-dollar-sign mr-[2px]"></i><span className="fiyat">{price.toFixed(2)} USD</span>
      </p>

      {/* color picker */}
<div className="flex items-center gap-3 mb-3">
  {["yellow", "white", "rose"].map((color) => {
    const isSelected = selectedColor === color;
    const bgColorMap = {
      yellow: "#E6CA97", // yellow gold page design
      white: "#D9D9D9",  // white gold page design
      rose: "#E1A4A9",   // rose gold page design
    };

    return (
      <div
        key={color}
        onClick={() => setSelectedColor(color)}
        className={`relative cursor-pointer transition-all duration-300 
          flex items-center justify-center
          ${isSelected ? "scale-110" : "hover:scale-105"}
        `}
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: bgColorMap[color],
          boxShadow: isSelected
            ? "0 0 0 3px #fff, 0 0 0 6px rgba(0,0,0,0.2)"
            : "0 0 0 2px rgba(0,0,0,0.15)",
          border: "none",
        }}
      ></div>
    );
  })}
</div>

      {/* color label = avenir book 12 */}
      <div className="font-avenir text-[12px] font-normal text-gray-500 mb-3 ">
        {colorLabelMap[selectedColor]}
      </div>

      {/* rating */}
      <div id="yildiz" className="w-full flex justify">
        {renderStars(popularity5)}
      </div>
    </div>
  );
}
