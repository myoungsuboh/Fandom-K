const calculateExpire = date => {
  const today = new Date();
  const created = new Date(date);
  const timeToDay = 1000 * 3600 * 24;

  return Math.ceil((created.getTime() - today.getTime()) / timeToDay);
};

const calculatePercentage = (current, target) => {
  const percentage = (current / target) * 100;
  return percentage <= 100 ? percentage : 100;
};

export {calculateExpire, calculatePercentage};
