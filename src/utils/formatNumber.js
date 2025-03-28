const formatNumber = (num) => {
  num = Number(num);
  if (Math.abs(num) >= 1.0e9) {
    return (num / 1.0e9).toFixed(1) + "B"; // Billion
  }
  if (Math.abs(num) >= 1.0e6) {
    return (num / 1.0e6).toFixed(1) + "M"; // Million
  }
  if (Math.abs(num) >= 1.0e3) {
    return (num / 1.0e3).toFixed(1) + "K"; // Thousand
  }
  return num?.toFixed(2);
};

export default formatNumber;
