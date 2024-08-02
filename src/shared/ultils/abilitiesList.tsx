import { GiBiceps } from "react-icons/gi";
import { GiSkiBoot } from "react-icons/gi";
import { GiMagicShield } from "react-icons/gi";
import { GiSpellBook } from "react-icons/gi";
import { GiWisdom } from "react-icons/gi";

import { ReactNode } from "react";
import { CharacterType } from "../../@types/app.types";
import { Icon } from "@iconify/react";
import { CalcAttributeBonus } from "./calcAttributeBonus";

type AbilityType = {
  field?: string;
  icon?: ReactNode;
  text?: string;
  points?: number;
  bonus?: number;
};

export const AbilitiesList: AbilityType[] = [
  {
    field: "strength",
    text: "Força",
    icon: <GiBiceps />,
    points: 8,
    bonus: CalcAttributeBonus(8),
  },
  {
    field: "dexterity",
    text: "Destreza",
    icon: <GiSkiBoot />,
    points: 8,
    bonus: CalcAttributeBonus(8),
  },
  {
    field: "constitution",
    text: "Constituição",
    icon: <GiMagicShield />,
    points: 8,
    bonus: CalcAttributeBonus(8),
  },
  {
    field: "intelligence",
    text: "Inteligência",
    icon: <GiSpellBook />,
    points: 8,
    bonus: CalcAttributeBonus(8),
  },
  {
    field: "wisdom",
    text: "Sabedoria",
    icon: <GiWisdom />,
    points: 8,
    bonus: CalcAttributeBonus(8),
  },
  {
    field: "charisma",
    text: "Carisma",
    icon: <Icon icon="fluent:handshake-24-filled" />,
    points: 8,
    bonus: CalcAttributeBonus(8),
  },
];

export const GetCharacterAbilitiesList = (
  character?: CharacterType
): AbilityType[] => {
  return AbilitiesList.map((ability) => {
    if (!character) return [] as any;
    ability.points = (character as any)[ability.field as any];
    ability.bonus = CalcAttributeBonus(ability.points!);
    return ability;
  });
};
