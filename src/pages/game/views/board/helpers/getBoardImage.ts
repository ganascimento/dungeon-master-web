import acid from "../../../../../shared/assets/images/acid.jpg";
import bridge from "../../../../../shared/assets/images/bridge.jpg";
import castle from "../../../../../shared/assets/images/castle.jpg";
import cavern from "../../../../../shared/assets/images/cavern.jpg";
import cityCenter from "../../../../../shared/assets/images/city-center.jpg";
import city from "../../../../../shared/assets/images/city.jpg";
import desert from "../../../../../shared/assets/images/desert.jpg";
import gates from "../../../../../shared/assets/images/gates.jpg";
import jungleTemple from "../../../../../shared/assets/images/jungle-temple.jpg";
import mountain from "../../../../../shared/assets/images/mountain.jpg";
import river from "../../../../../shared/assets/images/river.jpg";
import tavern from "../../../../../shared/assets/images/tavern.jpg";
import volcano from "../../../../../shared/assets/images/volcano.jpg";
import woodsLight from "../../../../../shared/assets/images/woods-light.jpg";
import woordsDark from "../../../../../shared/assets/images/woords-dark.jpg";

export const GetImagePath = (name?: string) => {
  switch (name) {
    case "acid.jpg":
      return acid;
    case "bridge.jpg":
      return bridge;
    case "castle.jpg":
      return castle;
    case "cavern.jpg":
      return cavern;
    case "city-center.jpg":
      return cityCenter;
    case "city.jpg":
      return city;
    case "deset.jpg":
      return desert;
    case "gates.jpg":
      return gates;
    case "jungle-temple.jpg":
      return jungleTemple;
    case "montain.jpg":
      return mountain;
    case "river.jpg":
      return river;
    case "tavern.jpg":
      return tavern;
    case "volcano.jpg":
      return volcano;
    case "woods-light.jpg":
      return woodsLight;
    case "woords-dark.jpg":
      return woordsDark;
    default:
      return tavern;
  }
};
