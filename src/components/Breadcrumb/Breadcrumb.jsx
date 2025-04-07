import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <div className="breadcrumb-container">
      <p className="breadcrumb-text">
        {items.map((item, index) => (
          <span key={index} className="breadcrumb-item text-xl xl:text-2xl">
            {item.link ? (
              <Link to={item.link} className="breadcrumb-link">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <IoIosArrowForward className="breadcrumb-arrow" />
            )}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Breadcrumb;
