import { GameButton } from "../../shared/components/GameButton";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATHS } from "../../shared/router/router.path";
import { Logo } from "../../shared/components/Logo";
import * as S from "./styles";
import { Content } from "../../shared/components/Content";

export default function HomePage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTER_PATHS.Adventure);
  };

  return (
    <Content>
      <S.Content>
        <Logo />

        <GameButton onClick={handleClick} text="Começar" />
      </S.Content>
    </Content>
  );
}
