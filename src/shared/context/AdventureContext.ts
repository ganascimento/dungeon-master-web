import { createContext } from "react";
import { AdventureType } from "../../@types/app.types";

const AdventureContext = createContext<
  [
    AdventureType | undefined,
    React.Dispatch<React.SetStateAction<AdventureType | undefined>>
  ]
>([] as any);

export default AdventureContext;
