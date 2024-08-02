import { BoarImageType } from "../../../../../@types/app.types";
import trapSvg from "../../../../../shared/assets/icons/traps.svg";
import trapActSvg from "../../../../../shared/assets/icons/trap-activated.svg";
import thiefSvg from "../../../../../shared/assets/icons/thief.svg";

export const LoadImages = (): BoarImageType[] => {
  const trapImg = new Image();
  trapImg.src = trapSvg;
  const trapActImg = new Image();
  trapActImg.src = trapActSvg;
  const thiefImg = new Image();
  thiefImg.src = thiefSvg;

  return [
    {
      img: trapImg,
      name: "trap",
    },
    {
      img: thiefImg,
      name: "thief",
    },
    {
      img: trapActImg,
      name: "trapActivated",
    },
  ];
};
