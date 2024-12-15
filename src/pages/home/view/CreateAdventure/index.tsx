/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Modal } from "../../../../shared/components/Modal";
import {
  AdventureType,
  CharacterType,
  CreateAdventureType,
} from "../../../../@types/app.types";
import { TextField } from "../../../../shared/components/TextField";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import { object, string } from "yup";
import LoaderContext from "../../../../shared/context/LoaderContext";
import { AdventureStore } from "../../../../shared/store/adventure.store";
import * as S from "./styles";
import { Icon } from "@iconify/react";
import { CharacterStore } from "../../../../shared/store/character.store";
import { PlayClickSong } from "../../../../shared/ultils/playSong";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  setAdventures: (value: AdventureType[] | undefined) => void;
};

export default function CreateAdventureView(props: Props) {
  const [data, setData] = useState<CreateAdventureType>();
  const [, setLoading] = useContext(LoaderContext);
  const [characters, setCharacters] = useState<CharacterType[]>([]);

  const adventureStore = new AdventureStore();
  const characterStore = new CharacterStore();

  useEffect(() => {
    if (props.isOpen) getCharacters();
  }, [props.isOpen]);

  let schema = object({
    name: string().required().min(5).max(50),
  });

  const getCharacters = async () => {
    const mCharacters = await characterStore.getAll();
    if (!!mCharacters) setCharacters(mCharacters);
  };

  const handleCreate = async () => {
    if (!data) return;
    PlayClickSong();
    setLoading(true);
    try {
      schema.validateSync(data);
      await adventureStore.create(data);
      const result = await adventureStore.getAll();
      props.setAdventures(result);
      setData({});
      close();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    props.onClose();
    setData(undefined);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={close}
      title="Vamos criar uma nova campanha"
    >
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <div>
          <TextField
            placeholder="Nome da campanha"
            value={data?.name}
            onChange={(e) => setData({ ...data, name: e })}
            minLength={5}
            maxLength={50}
          />
        </div>

        <S.SubTitle
          color={
            data?.difficultyLevel && data.difficultyLevel > 0
              ? "rgba(0,255,0,.5)"
              : "#fff"
          }
        >
          Selecione a dificuldade
        </S.SubTitle>

        <Wrapper justifyContent="space-around">
          <MenuButton
            text="Iniciante"
            marginBottom="0px"
            width={150}
            onClick={() => {
              PlayClickSong();
              setData({ ...data, difficultyLevel: 1 });
            }}
            active={data?.difficultyLevel === 1}
          />
          <MenuButton
            text="Normal"
            marginBottom="0px"
            width={150}
            onClick={() => {
              PlayClickSong();
              setData({ ...data, difficultyLevel: 2 });
            }}
            active={data?.difficultyLevel === 2}
          />
          <MenuButton
            text="Difícil"
            marginBottom="0px"
            width={150}
            onClick={() => {
              PlayClickSong();
              setData({ ...data, difficultyLevel: 3 });
            }}
            active={data?.difficultyLevel === 3}
          />
          <MenuButton
            text="Herói"
            marginBottom="0px"
            width={150}
            onClick={() => {
              PlayClickSong();
              setData({ ...data, difficultyLevel: 4 });
            }}
            active={data?.difficultyLevel === 4}
          />
          <MenuButton
            text="Desafiante"
            marginBottom="0px"
            width={150}
            onClick={() => {
              PlayClickSong();
              setData({ ...data, difficultyLevel: 5 });
            }}
            active={data?.difficultyLevel === 5}
          />
        </Wrapper>

        <S.SubTitle
          color={
            data?.characterIds && data.characterIds.length > 0
              ? "rgba(0,255,0,.5)"
              : "#fff"
          }
        >
          Personagens
        </S.SubTitle>

        {characters && characters.length > 0 ? (
          <S.PersonAddContent>
            {characters.map((character, index) => (
              <S.PersonAdd
                key={index}
                selected={!!data?.characterIds?.includes(character.id!)}
                onClick={() => {
                  if (!!data?.characterIds?.includes(character.id!)) {
                    setData({
                      ...data,
                      characterIds: data?.characterIds?.filter(
                        (x) => x !== character.id
                      ),
                    });
                  } else {
                    if (data?.characterIds?.length === 3) return;
                    const mData = { ...(data ?? {}) };
                    if (!mData.characterIds) mData.characterIds = [];
                    mData?.characterIds?.push(character.id!);
                    setData(mData);
                  }
                }}
              >
                <Icon icon={character.class?.icon!} fontSize={40} />
                <div>{character.name}</div>
              </S.PersonAdd>
            ))}
          </S.PersonAddContent>
        ) : (
          <span style={{ color: "rgba(255,0,0,.7)" }}>
            Crie pelo menos um personagem
          </span>
        )}

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
          <MenuButton
            text="Criar"
            marginBottom="0px"
            width={150}
            onClick={handleCreate}
            disabled={
              !data?.name ||
              !data?.difficultyLevel ||
              !data?.characterIds ||
              data.characterIds.length === 0
            }
          />
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
