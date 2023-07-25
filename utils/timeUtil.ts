// convert the time to a time-readable string
export const timeString = (time: number): string => {
  return `0:${time < 10 ? `0${time}` : time}`;
};
