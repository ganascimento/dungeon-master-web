import { GiWomanElfFace } from "react-icons/gi";
import { RaceEnum } from "../../@types/constants.types";
import { Icon } from "@iconify/react";

export const RaceList = [
  {
    race: RaceEnum.Human,
    icon: <Icon icon="fluent-emoji-high-contrast:person-beard" />,
  },
  {
    race: RaceEnum.Elf,
    icon: <GiWomanElfFace />,
  },
];
