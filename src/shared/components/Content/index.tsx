/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState } from "react";
import * as S from "./styles";
import background1 from "../../assets/backgrounds/background1.jpg";
import backgroundFull1 from "../../assets/backgrounds/background1-full.jpg";
import background2 from "../../assets/backgrounds/background2.jpg";
import backgroundFull2 from "../../assets/backgrounds/background2-full.jpg";

type Props = {
  children: ReactNode;
  type?: number;
};

export const Content = ({ children, type = 1 }: Props) => {
  const [image, setImage] = useState<any>();

  useEffect(() => {
    setImage(onSetImage);
    window.onresize = null;
    window.onresize = () => {
      setImage(onSetImage);
    };
  }, []);

  const onSetImage = () => {
    let imageFull;
    let imageNormal;

    if (type === 1) {
      imageFull = backgroundFull1;
      imageNormal = background1;
    } else if (type === 2) {
      imageFull = backgroundFull2;
      imageNormal = background2;
    }

    if (window.innerWidth > 2100) return imageFull;
    return imageNormal;
  };

  return (
    <S.Content background={`url(${image})`} useImage={true}>
      <S.SubContent>{children}</S.SubContent>
    </S.Content>
  );
};
