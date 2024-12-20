/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "../../../../shared/components/Modal";
import { CharacterType, RoomType } from "../../../../@types/app.types";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import { RoomStore } from "../../../../shared/store/room.store";
import * as S from "./styles";
import { getUserId } from "../../../../shared/security/authentication";
import { Icon } from "@iconify/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  room: RoomType;
  characters: CharacterType[];
  started: boolean;
};

export default function ViewRoomView(props: Props) {
  const roomStore = new RoomStore();
  const userId = getUserId();

  const close = async () => {
    if (props.started) return;
    props.onClose();
    await roomStore.leave(props.room.id);
  };

  const handleDifficultyLevel = async (value: number) => {
    if (!!value) await roomStore.SelectDifficulty(props.room.id, value);
  };

  const handleSelectCharacter = async (character: CharacterType) => {
    await roomStore.chooseCharacter(props.room.id, character.id!);
  };

  const handleStart = async () => {
    await roomStore.start(props.room.id);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={close} title={props.room.name}>
      <Wrapper
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <S.SubTitle>Jogadores</S.SubTitle>
        <S.PersonContent>
          {props.room.players.map((player, index) => (
            <S.PersonView key={index}>
              <Icon
                icon={
                  !!player.character
                    ? player.character.class?.icon!
                    : "material-symbols:person-rounded"
                }
                fontSize={40}
              />
              <div>{player.userName}</div>
            </S.PersonView>
          ))}
        </S.PersonContent>

        <S.SubTitle>Selecione seu personagem</S.SubTitle>
        <S.PersonContent>
          {props.characters.map((character, index) => (
            <S.PersonSelect
              onClick={() => handleSelectCharacter(character)}
              key={index}
            >
              <Icon icon={character.class?.icon!} fontSize={40} />
              <div>{character.name}</div>
            </S.PersonSelect>
          ))}
        </S.PersonContent>

        <S.SubTitle>
          {props.room.userId === userId
            ? "Selecione a dificuldade"
            : "Dificuldade"}
        </S.SubTitle>

        <Wrapper justifyContent="space-around">
          <MenuButton
            text="Iniciante"
            marginBottom="0px"
            width={150}
            onClick={() => handleDifficultyLevel(1)}
            active={props.room.difficultyLevel === 1}
            disabled={props.room.userId !== userId}
          />
          <MenuButton
            text="Normal"
            marginBottom="0px"
            width={150}
            onClick={() => handleDifficultyLevel(2)}
            active={props.room.difficultyLevel === 2}
            disabled={props.room.userId !== userId}
          />
          <MenuButton
            text="Difícil"
            marginBottom="0px"
            width={150}
            onClick={() => handleDifficultyLevel(3)}
            active={props.room.difficultyLevel === 3}
            disabled={props.room.userId !== userId}
          />
          <MenuButton
            text="Herói"
            marginBottom="0px"
            width={150}
            onClick={() => handleDifficultyLevel(4)}
            active={props.room.difficultyLevel === 4}
            disabled={props.room.userId !== userId}
          />
          <MenuButton
            text="Desafiante"
            marginBottom="0px"
            width={150}
            onClick={() => handleDifficultyLevel(5)}
            active={props.room.difficultyLevel === 5}
            disabled={props.room.userId !== userId}
          />
        </Wrapper>
        <Wrapper
          justifyContent="end"
          alignItems="end"
          gap="10px"
          height="auto"
          margin="70px 0 0 0"
        >
          <MenuButton
            text="Sair"
            marginBottom="0px"
            width={150}
            onClick={close}
            loading={props.started}
            disabled={props.started}
          />
          {props.room.userId === userId ? (
            <MenuButton
              text="Começar"
              marginBottom="0px"
              width={150}
              onClick={handleStart}
              disabled={
                !props.room.difficultyLevel ||
                !!props.room.players.find((player) => !player.character) ||
                props.started
              }
              loading={props.started}
            />
          ) : (
            <></>
          )}
        </Wrapper>
      </Wrapper>
    </Modal>
  );
}
