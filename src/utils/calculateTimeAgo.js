const calculateTimeAgo = (timestamp) => {
  const currentTime = new Date().getTime();
  const previousTime = new Date(timestamp).getTime();
  const timeDifference = currentTime - previousTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days ? `${days} day${days > 1 ? "s" : ""} ago` : "";
  } else if (hours > 0) {
    return hours ? `${hours} hour${hours > 1 ? "s" : ""} ago` : "";
  } else if (minutes > 0) {
    return minutes ? `${minutes} minute${minutes > 1 ? "s" : ""} ago` : "";
  } else {
    return seconds ? `${seconds} second${seconds > 1 ? "s" : ""} ago` : "";
  }
};
export default calculateTimeAgo;
