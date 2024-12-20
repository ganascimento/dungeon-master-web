export const MapDifficutyToString = (
  difficutyLevel: number | undefined
): string => {
  switch (difficutyLevel) {
    case 2:
      return "Normal";
    case 3:
      return "Difícil";
    case 4:
      return "Herói";
    case 5:
      return "Desafiante";
    default:
      return "Iniciante";
  }
};
