type TimeParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export const getTime = (time: number): TimeParts => {
  const days = Math.trunc(time / (24 * 60 * 60));
  const hours = Math.trunc((time - days * (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.trunc((time - days * 86400 - hours * 3600) / 60);
  const seconds = Math.trunc(time - days * 86400 - hours * 3600 - minutes * 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};
