/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Modal } from "../../../../shared/components/Modal";
import { AdventureType, CharacterType } from "../../../../@types/app.types";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import LoaderContext from "../../../../shared/context/LoaderContext";
import * as S from "./styles";
import { Icon } from "@iconify/react";
import { ROUTER_PATHS } from "../../../../shared/router/router.path";
import { CharacterStore } from "../../../../shared/store/character.store";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setAdventures: (value: AdventureType[] | undefined) => void;
};

export default function CreatePersonView(props: Props) {
  const [, setLoading] = useContext(LoaderContext);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  const characterStore = new CharacterStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (props.isOpen) getCharacters();
  }, [props.isOpen]);

  const goToCreate = (id: string) => {
    navigate(ROUTER_PATHS.Char.replace(":id", id));
  };

  const getCharacters = async () => {
    setLoading(true);
    try {
      const mCharacters = await characterStore.getAll();
      if (mCharacters) setCharacters(mCharacters);
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    props.onClose();
  };

  return (
    <Modal isOpen={props.isOpen} onClose={close} title="Criação de personagens">
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <S.PersonAddContent>
          {characters.map((character, index) => (
            <S.PersonAdd onClick={() => goToCreate(character.id!)} key={index}>
              <Icon icon={character.class?.icon!} fontSize={40} />
              <div>{character.name}</div>
            </S.PersonAdd>
          ))}
          <S.PersonAdd onClick={() => goToCreate("0")}>
            <Icon icon="ic:baseline-add" />
          </S.PersonAdd>
        </S.PersonAddContent>

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
            onClick={close}
          />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
