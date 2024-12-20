/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "../../../../shared/components/Modal";
import { CharacterType, PvPType } from "../../../../@types/app.types";
import { MenuButton } from "../../../../shared/components/MenuButton";
import Wrapper from "../../../../shared/components/Wrapper";
import * as S from "./styles";
import { getUserId } from "../../../../shared/security/authentication";
import { Icon } from "@iconify/react";
import { PvPStore } from "../../../../shared/store/pvp.store";
import { PulseLoader } from "react-spinners";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  room: PvPType;
  characters: CharacterType[];
  started: boolean;
};

export default function ViewPvPRoomView(props: Props) {
  const pvpStore = new PvPStore();
  const userId = getUserId();

  const close = async () => {
    if (props.started) return;
    props.onClose();
    await pvpStore.leave(props.room.id);
  };

  const handleSelectCharacter = async (characterId: string) => {
    const player = props.room.players.find((p) => p.userId === userId);
    if (!player) return;

    let characterIds = [...(player.characterIds ?? [])];

    if (!characterIds.includes(characterId)) characterIds.push(characterId);
    else characterIds = characterIds.filter((c) => c !== characterId);

    await pvpStore.chooseCharacter(props.room.id, characterIds);
  };

  const handleReady = async () => {
    await pvpStore.ready(props.room.id);
  };

  const handleStart = async () => {
    await pvpStore.start(props.room.id);
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={close}
      title={`PVP - ${props.room.name}`}
    >
      <S.Content>
        {props.room.players.map((player, index) => (
          <Wrapper
            key={index}
            flexDirection="column"
            justifyContent="space-between"
            width="50%"
          >
            <S.SubTitle>
              Player {index + 1} - {player.userName}
            </S.SubTitle>

            {player.userId === userId ? (
              <S.PersonContent>
                {props.characters.map((character, index) => (
                  <S.PersonSelect
                    key={index}
                    onClick={() =>
                      !player.ready
                        ? handleSelectCharacter(character.id!)
                        : undefined
                    }
                    $active={
                      player.characterIds?.includes(character.id!) ?? false
                    }
                    $isMyChar={true}
                  >
                    <Icon icon={character.class?.icon!} fontSize={40} />
                    <div>{character.name}</div>
                  </S.PersonSelect>
                ))}
              </S.PersonContent>
            ) : (
              <S.PersonContent>
                {[1, 2, 3].map((index) => (
                  <S.PersonSelect
                    key={index}
                    $active={(player.characterIds?.length ?? 0) >= index}
                    $isMyChar={false}
                  >
                    {(player.characterIds?.length ?? 0) >= index ? (
                      <Icon icon="ei:check" fontSize={52} color="#28a745" />
                    ) : (
                      <PulseLoader size={8} color="rgba(0,0,0,.5)" />
                    )}
                  </S.PersonSelect>
                ))}
              </S.PersonContent>
            )}

            {userId === player.userId ? (
              <Wrapper
                justifyContent="center"
                alignItems="center"
                gap="10px"
                height="auto"
                margin="70px 0 0 0"
              >
                <MenuButton
                  text="Pronto"
                  marginBottom="0px"
                  width={150}
                  onClick={handleReady}
                  loading={props.started}
                  disabled={props.started}
                  color={player.ready ? "#28a745" : undefined}
                />
              </Wrapper>
            ) : player.ready ? (
              <Wrapper
                justifyContent="center"
                alignItems="center"
                gap="10px"
                height="auto"
                margin="70px 0 0 0"
              >
                <S.TextReady>Vamos lá!</S.TextReady>
              </Wrapper>
            ) : (
              <></>
            )}
          </Wrapper>
        ))}
      </S.Content>

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
              !!props.room.players.find((player) => !player.ready) ||
              props.started ||
              props.room.players.length !== 2 ||
              !!props.room.players.find(
                (player) => player.characterIds?.length === 0
              )
            }
            loading={props.started}
          />
        ) : (
          <></>
        )}
      </Wrapper>
    </Modal>
  );
}
