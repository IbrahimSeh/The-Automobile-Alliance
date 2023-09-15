import React from "react";
import { useState } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "../../../css/SliderImages.css";

const SliderImages = ({ sliderImages, alt }) => {
  const [activeImageNum, setCurrent] = useState(0);
  const length = sliderImages.length;

  const nextSlide = () => {
    setCurrent(activeImageNum === length - 1 ? 0 : activeImageNum + 1);
  };
  const prevSlide = () => {
    setCurrent(activeImageNum === 0 ? length - 1 : activeImageNum - 1);
  };

  if (!Array.isArray(sliderImages) || sliderImages.length <= 0) {
    return null;
  }

  return (
    <div>
      <section className="image-slider">
        <div className="left">
          <ArrowBackIosIcon onClick={prevSlide} />
        </div>
        <div className="right">
          <ArrowForwardIosIcon onClick={nextSlide} />
        </div>
        {sliderImages.map((currentSlide, ind) => {
          return (
            <div
              className={
                ind === activeImageNum ? "currentSlide active" : "currentSlide"
              }
              key={ind}
            >
              {ind === activeImageNum && (
                <img src={currentSlide} alt={alt[ind]} className="image" />
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
export default SliderImages;
