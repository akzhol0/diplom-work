import React, { useState } from "react";

type StartRatingProps = {
  setRatingInput: (arg0: number) => void;
};

const StarRating = ({ setRatingInput }: StartRatingProps) => {
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
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            onMouseLeave={() => setHoveredRating(0)}
            className={`text-2xl ps-1 ${
              starValue <= (hoveredRating || selectedRating)
                ? "text-yellow-500"
                : "text-gray-300"
            }`}
            aria-label={`Rate ${starValue} stars`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
