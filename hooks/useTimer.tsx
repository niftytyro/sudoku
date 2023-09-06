import { formatTime } from "@/utils/time";
import React, { useCallback, useEffect, useRef, useState } from "react";

const useTimer = () => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const interval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      setSecondsElapsed((seconds) => seconds + 1);
    }, 1000);

    return () => {
      if (!!interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  const stopTimer = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  const time = formatTime(secondsElapsed);

  return { time, secondsElapsed, stopTimer };
};

export default useTimer;
