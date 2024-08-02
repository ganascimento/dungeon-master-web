export const CalcAttributeBonus = (points: number) => {
  const bonus = points - 8;
  if (bonus <= 1) return -1;
  if (bonus - 2 <= 1) return 0;
  return Math.floor((bonus - 2) / 2);
};
