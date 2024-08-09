import { createContext } from "react";

const LoadingContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>]
>([] as any);

export default LoadingContext;
