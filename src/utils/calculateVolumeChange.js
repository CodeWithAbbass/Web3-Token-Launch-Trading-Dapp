function calculateVolumeChange(currentVolume, previousVolume) {
  if (previousVolume === 0) {
    return "Previous volume is zero, cannot calculate percentage change.";
  }

  // Calculate percentage change
  let percentageChange =
    ((currentVolume - previousVolume) / previousVolume) * 100;
  return percentageChange.toFixed(2) + "%";
}
