type Props = {
  fontSize?: string;
};

export const Logo = (props: Props) => {
  return (
    <p
      style={{
        fontFamily: "DragonHunter",
        fontSize: props.fontSize ?? "45px",
        textAlign: "center",
      }}
    >
      Dungeon
      <br />
      Master AI
    </p>
  );
};
