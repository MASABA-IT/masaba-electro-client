import React from "react";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const decimalPart = rating % 1;
  const stars = [];

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key={`full-${i}`} className="text-orange-400">
        ★
      </span>
    );
  }

  // Add partial star if there's a decimal part
  if (decimalPart > 0) {
    // Calculate the percentage of the star that should be filled
    const fillPercentage = decimalPart * 100;

    stars.push(
      <span key="partial" className="relative inline-block">
        {/* Empty star background */}
        <span className="text-gray-300">★</span>
        {/* Filled portion of the star */}
        <span
          className="text-orange-400 absolute left-0 top-0 overflow-hidden"
          style={{ width: `${fillPercentage}%` }}
        >
          ★
        </span>
      </span>
    );
  }

  // Add empty stars to make up to 5
  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars.push(
      <span key={`empty-${i}`} className="text-gray-300">
        ★
      </span>
    );
  }

  return <div className="flex items-center">{stars}</div>;
};

export default StarRating;
