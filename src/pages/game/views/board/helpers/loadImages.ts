import { BoarImageType } from "../../../../../@types/app.types";
import trapSvg from "../../../../../shared/assets/icons/traps.svg";
import trapActSvg from "../../../../../shared/assets/icons/trap-activated.svg";
import skullSvg from "../../../../../shared/assets/icons/skull.svg";
import warriorSvg from "../../../../../shared/assets/icons/warrior.svg";
import archerSvg from "../../../../../shared/assets/icons/archer.svg";
import priestSvg from "../../../../../shared/assets/icons/priest.svg";
import mageSvg from "../../../../../shared/assets/icons/mage.svg";
import warlockSvg from "../../../../../shared/assets/icons/warlock.svg";

export const LoadImages = (): BoarImageType[] => {
  const trapImg = new Image();
  trapImg.src = trapSvg;
  const trapActImg = new Image();
  trapActImg.src = trapActSvg;
  const skullImg = new Image();
  skullImg.src = skullSvg;
  const warriorImg = new Image();
  warriorImg.src = warriorSvg;
  const archerImg = new Image();
  archerImg.src = archerSvg;
  const priestImg = new Image();
  priestImg.src = priestSvg;
  const mageImg = new Image();
  mageImg.src = mageSvg;
  const warlockImg = new Image();
  warlockImg.src = warlockSvg;

  return [
    {
      img: trapImg,
      name: "trap",
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
      img: warriorImg,
      name: "warrior",
    },
    {
      img: archerImg,
      name: "archer",
    },
    {
      img: priestImg,
      name: "priest",
    },
    {
      img: mageImg,
      name: "mage",
    },
    {
      img: warlockImg,
      name: "warlock",
    },
  ];
};
