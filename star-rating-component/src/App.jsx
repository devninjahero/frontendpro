import { useState } from "react";
import Star from "./Star";
import "./App.css";

function App() {
  const starsData = [
    {
      id: 1,
      text: "We're sorry to hear that you had a bad experience. We would like to learn more about what happened and how we can make things right.",
    },
    {
      id: 2,
      text: "We apologize for the inconvenience you experienced. We appreciate your feedback and would like to work with you to address any issues.",
    },
    {
      id: 3,
      text: "Thank you for your feedback. We're sorry to hear that your experience eans't perfect. We would love to hear more about your concerns to see how we can improve.",
    },
    {
      id: 4,
      text: "Thank you for your positive feedback! We're glad to know that you had a great experience and we appreciate your support.",
    },
    {
      id: 5,
      text: "Excellent! We're thrilled to hear that you had such a positive experience. Thank you for choosing our platform.",
    },
  ];
  const [rating, setRating] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(0);
  const [hoverDiv, setHoverDiv] = useState(false);
  const [hoverEnabled, setHoverEnabled] = useState(true);

  const handleClick = (index) => {
    setRating(index);
    setHoverEnabled(false);
  };

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(0);
    setHoverEnabled(true);
  };

  const handleMouseEnterDiv = () => {
    setHoverDiv(true);
  };

  const handleMouseLeaveDiv = () => {
    setHoverDiv(false);
  };

  return (
    <>
      <section className="rating-card">
        <h1 className="rating-title">
          How many stars would you give to our Online Code Editor?
        </h1>
        <div
          className="rating-stars"
          onMouseOver={handleMouseEnterDiv}
          onMouseLeave={handleMouseLeaveDiv}
        >
          {starsData.map((star) => (
            <Star
              key={star.id}
              // selected={star.id <= (hoverIndex || rating)}
              selected={star.id <= rating}
              hovered={hoverEnabled && star.id === hoverIndex}
              musthover={hoverDiv}
              onClick={() => handleClick(star.id)}
              onHover={() => handleMouseEnter(star.id)}
              onLeave={() => handleMouseLeave()}
            />
          ))}
        </div>
        <span className="rating-text">
          {rating > 0 && starsData[rating - 1].text}
        </span>
      </section>
    </>
  );
}

export default App;
