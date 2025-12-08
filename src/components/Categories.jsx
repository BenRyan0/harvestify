import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { FaThList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Categories = () => {
  const { categories } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mdtablet: {
      breakpoint: { max: 991, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    smmobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-[85%] mx-auto relative">
      <Carousel
        className="rounded-md "
        autoPlay={true}
        infinite={true}
        arrows={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categories.map((c, i) => (
          <Link
            className="h-[70px] md-lg:h-[80px] border block"
            key={i}
            to="#"
          >
            <div className="w-full h-full relative">
              <img
                className="h-full w-full rounded-md object-cover"
                style={{ objectPosition: "60% 10%" }}
                src={c.image || "/path/to/fallback-image.jpg"}
                alt={c.altText || "Category image"}
                onError={(e) => {
                  e.target.src = "/path/to/fallback-image.jpg";
                }}
              />

              <div className="absolute bottom-6 w-full mx-auto font-bold left-0 flex flex-col justify-center items-center">
                <span className="py-[2px] px-6 bg-[#3330305d] text-white text-xs">
                  {c.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categories;
