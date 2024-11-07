import "./styles.css";

type Props = {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
};

export const GameButton = (props: Props) => {
  return (
    <>
      <button
        className={`game-button green ${props.disabled ? "disabled" : ""}`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
};
