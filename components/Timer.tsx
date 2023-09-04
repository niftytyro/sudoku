"use client";

import { formatTime } from "@/utils/time";
import React, { useEffect, useState } from "react";

const Timer = () => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const time = formatTime(secondsElapsed);

  return <p className="text-3xl mb-5">{time}</p>;
};

export default Timer;
