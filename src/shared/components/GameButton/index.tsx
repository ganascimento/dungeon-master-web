import "./styles.css";

type Props = {
  onClick?: () => void;
  text: string;
};

export const GameButton = (props: Props) => {
  return (
    <>
      <button className="game-button green" onClick={props.onClick}>
        {props.text}
      </button>
    </>
  );
};
