export const formatTime = (seconds: number) => {
  const secondsInHour = 60 * 60;
  const hours = Math.floor(seconds / secondsInHour);

  seconds = seconds - hours * secondsInHour;
  const minutes = Math.floor(seconds / 60);

  seconds = seconds - minutes * 60;

  if (hours) {
    return (
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0")
    );
  }

  return (
    minutes.toString().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
};
