import { PositionType, SkillType } from "../../../../../@types/app.types";

export const CheckValidCast = (
  skill: SkillType,
  currentPosition: PositionType,
  targetPositions: PositionType[]
): boolean => {
  let isValidCast = true;

  for (var position of targetPositions) {
    isValidCast =
      position.x <= currentPosition.x + skill.range &&
      position.x >= currentPosition.x - skill.range &&
      position.y <= currentPosition.y + skill.range &&
      position.y >= currentPosition.y - skill.range;

    if (!isValidCast) break;
  }

  return isValidCast;
};
