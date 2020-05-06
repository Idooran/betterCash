export const convertToBigNumberFormat = (num) => {
  return Math.abs(Number(num)) >= 1.0e9
    ? (Math.abs(Number(num)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(num)) >= 1.0e6
    ? (Math.abs(Number(num)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(num)) >= 1.0e3
    ? (Math.abs(Number(num)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(num));
};
