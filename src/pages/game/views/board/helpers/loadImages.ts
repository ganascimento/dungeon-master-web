import { BoarImageType } from "../../../../../@types/app.types";
import trapSvg from "../../../../../shared/assets/icons/traps.svg";
import trapActSvg from "../../../../../shared/assets/icons/trap-activated.svg";
import thiefSvg from "../../../../../shared/assets/icons/thief.svg";
import skullSvg from "../../../../../shared/assets/icons/skull.svg";
import travelPointSvg from "../../../../../shared/assets/icons/travel-point.svg";

export const LoadImages = (): BoarImageType[] => {
  const trapImg = new Image();
  trapImg.src = trapSvg;
  const trapActImg = new Image();
  trapActImg.src = trapActSvg;
  const thiefImg = new Image();
  thiefImg.src = thiefSvg;
  const skullImg = new Image();
  skullImg.src = skullSvg;
  const travelPointImg = new Image();
  travelPointImg.src = travelPointSvg;

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
    {
      img: skullImg,
      name: "skull",
    },
    {
      img: travelPointImg,
      name: "travelPoint",
    },
  ];
};
