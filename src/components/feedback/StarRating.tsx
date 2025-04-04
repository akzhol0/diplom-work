import React, { useState } from "react";

type StartRatingProps = {
  setRatingInput: (arg0: number) => void;
  ratingInput: number;
};

const StarRating = ({ setRatingInput, ratingInput }: StartRatingProps) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (value: React.SetStateAction<number>) => {
    setSelectedRating(value);
    setRatingInput(Number(value));
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={index}
            value={ratingInput}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
            className={`text-2xl pe-1 ${
              starValue <= (hoveredRating || selectedRating)
                ? "text-red-500"
                : "text-gray-300"
            }`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
