const roundToHalf = value => {
  var decimal = value - parseInt(value, 10);
  decimal = Math.round(decimal * 10);
  if (decimal === 5) {
    return parseInt(value, 10) + 0.5;
  }
  if (decimal < 3 || decimal > 7) {
    return Math.round(value);
  } else {
    return parseInt(value, 10) + 0.5;
  }
};

export default roundToHalf;
