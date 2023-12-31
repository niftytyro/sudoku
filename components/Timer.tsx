import React from "react";

interface TimerProps {
  time: string;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  return <p className="text-xl md:text-3xl xl:mb-5">{time}</p>;
};

export default Timer;
