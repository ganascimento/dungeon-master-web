import { useNavigate } from "react-router-dom";
import { AdventureType } from "../../../../@types/app.types";
import { Modal } from "../../../../shared/components/Modal";
import * as S from "./styles";
import { FaBattleNet } from "react-icons/fa6";
import { ROUTER_PATHS } from "../../../../shared/router/router.path";
import { useContext } from "react";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { AdventureStore } from "../../../../shared/store/adventure.store";
import Wrapper from "../../../../shared/components/Wrapper";
import { MenuButton } from "../../../../shared/components/MenuButton";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  adventures?: AdventureType[];
};

export default function SelectAdventureView(props: Props) {
  const [, setAdventure] = useContext(AdventureContext);

  const navigate = useNavigate();
  const adventureStore = new AdventureStore();

  const handleClick = async (adventure: AdventureType) => {
    const result = await adventureStore.getById(adventure!.id!);
    setAdventure(result);
    navigate(ROUTER_PATHS.Game);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Escolha qual aventura quer seguir"
    >
      <>
        {props.adventures?.map((adventure, index) => (
          <S.Flag onClick={() => handleClick(adventure)} key={index}>
            <i>
              <FaBattleNet />
            </i>
            <span>{adventure.name}</span>
            <i>
              <FaBattleNet />
            </i>
          </S.Flag>
        ))}

        <Wrapper
          justifyContent="end"
          alignItems="end"
          gap="10px"
          height="auto"
          margin="70px 0 0 0"
        >
          <MenuButton
            text="Fechar"
            marginBottom="0px"
            width={150}
            onClick={props.onClose}
          />
        </Wrapper>
      </>
    </Modal>
  );
}
