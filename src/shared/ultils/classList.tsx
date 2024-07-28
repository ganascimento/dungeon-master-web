import { ClassEnum } from "../../@types/constants.types";
import { GiElfHelmet } from "react-icons/gi";
import { GiWizardStaff } from "react-icons/gi";

export const ClassList: { class: ClassEnum; icon: JSX.Element }[] = [
  {
    class: ClassEnum.Paladin,
    icon: <GiElfHelmet />,
  },
  {
    class: ClassEnum.Mage,
    icon: <GiWizardStaff />,
  },
];
