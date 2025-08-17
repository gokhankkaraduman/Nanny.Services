export const capitalizeArray = (arr) =>
  arr.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(", ");
