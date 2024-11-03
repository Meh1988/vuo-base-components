import { Star } from "@vuo/components/atoms/Star";
import { useState } from "react";

export const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (rating: number) => {
    setRating(rating + 1);
  };

  return (
    <div style={{ display: "flex" }}>
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};
