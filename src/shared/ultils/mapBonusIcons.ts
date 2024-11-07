import { EffectEnum } from "../../@types/constants.types";

export const MapBonusIcons = (type: EffectEnum) => {
  switch (type) {
    case EffectEnum.AttackRoll:
      return "game-icons:winged-sword";
    case EffectEnum.ArmorClass:
      return "game-icons:chest-armor";
    case EffectEnum.Stamina:
      return "arcticons:breathly";
    case EffectEnum.DamageRoll:
      return "ri:knife-blood-line";
    case EffectEnum.Bleeding:
      return "fontisto:blood-drop";
    default:
      return "";
  }
};

export const MapBonusColor = (type: EffectEnum) => {
  switch (type) {
    case EffectEnum.AttackRoll:
      return "#00CED1";
    case EffectEnum.ArmorClass:
      return "#bbb";
    case EffectEnum.Stamina:
      return "#FFD700";
    case EffectEnum.DamageRoll:
      return "#DC143C";
    case EffectEnum.Bleeding:
      return "red";
    default:
      return "";
  }
};
