import { PulseLoader } from "react-spinners";
import "./styles.css";

type Props = {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  loading?: boolean;
};

export const GameButton = (props: Props) => {
  return (
    <>
      <button
        className={`game-button green ${props.disabled ? "disabled" : ""}`}
        onClick={props.onClick}
      >
        {props.loading ? (
          <PulseLoader size={8} color="rgba(0,0,0,.5)" />
        ) : (
          props.text
        )}
      </button>
    </>
  );
};
