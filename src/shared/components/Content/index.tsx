import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Content = ({ children }: Props) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          maxWidth: "1500px",
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
};
