/* eslint-disable react-hooks/exhaustive-deps */
import {
  CharacterType,
  PvPRoomMinimalType,
  PvPType,
} from "../../../../@types/app.types";
import { Modal } from "../../../../shared/components/Modal";
import * as S from "./styles";
import { useContext, useEffect, useState } from "react";
import Wrapper from "../../../../shared/components/Wrapper";
import { MenuButton } from "../../../../shared/components/MenuButton";
import { PlayStartSong } from "../../../../shared/ultils/playSong";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { CharacterStore } from "../../../../shared/store/character.store";
import LoaderContext from "../../../../shared/context/LoaderContext";
import { useNavigate } from "react-router-dom";
import { PlayMusic } from "../../../../shared/ultils/playMusics";
import { ROUTER_PATHS } from "../../../../shared/router/router.path";
import AdventureContext from "../../../../shared/context/AdventureContext";
import { AdventureStore } from "../../../../shared/store/adventure.store";
import {
  CharacterModeEnum,
  RoomEnum,
} from "../../../../@types/constants.types";
import { GetAdventureParse } from "../../../../shared/ultils/getAdventureParse";
import { PvPStore } from "../../../../shared/store/pvp.store";
import CreatePvPRoomsView from "../CreatePvPRoom";
import ViewPvPRoomView from "../ViewPvPRoom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PvPView(props: Props) {
  const [, setAdventure] = useContext(AdventureContext);
  const [, setLoading] = useContext(LoaderContext);

  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenViewRoom, setIsOpenViewRoom] = useState(false);
  const [dataRooms, setDataRooms] = useState<PvPRoomMinimalType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<PvPType>();
  const [updateRoom, setUpdateRoom] = useState<PvPRoomMinimalType>();
  const [roomRemoved, setRoomRemoved] = useState<string>();
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [started, setStarted] = useState(false);

  const navigate = useNavigate();
  const pvpStore = new PvPStore();
  const characterStore = new CharacterStore();
  const adventureStore = new AdventureStore();

  useEffect(() => {
    hubConnect();
  }, [props.isOpen]);

  useEffect(() => {
    const mDataRooms = [...dataRooms].map((dataRoom) => {
      if (dataRoom.id === updateRoom?.id) return updateRoom;
      return dataRoom;
    });

    setDataRooms(mDataRooms);
  }, [updateRoom]);

  useEffect(() => {
    window.addEventListener("beforeunload", async () => {
      await pvpStore.disconnect();
    });
  }, []);

  useEffect(() => {
    const mDataRooms = [...dataRooms].filter((room) => room.id !== roomRemoved);
    setDataRooms(mDataRooms);
    if (selectedRoom?.id === roomRemoved) setIsOpenViewRoom(false);
  }, [roomRemoved]);

  const hubConnect = async () => {
    try {
      setLoading(true);
      if (props.isOpen) {
        await pvpStore.attachRooms((rooms: PvPRoomMinimalType[]) => {
          setDataRooms(rooms);
        });

        await pvpStore.attachRoomCreated((room: PvPType) => {
          setSelectedRoom(room);
          setIsOpenViewRoom(true);
        });

        await pvpStore.attachRoomCreateError((name: string) => {
          toast.error(`Já existe uma sala com o nome '${name}'`);
        });

        await pvpStore.attachRoomRemoved((roomId: string) =>
          setRoomRemoved(roomId)
        );

        await pvpStore.attachUpdateRoom((room: PvPRoomMinimalType) =>
          setUpdateRoom(room)
        );

        await pvpStore.attachUpdateCurrentRoom((room: PvPType) => {
          setSelectedRoom(room);
          if (!isOpenViewRoom) setIsOpenViewRoom(true);
        });

        await pvpStore.attachAdventureLoad(() => {
          setStarted(true);
        });

        await pvpStore.attachAdventureStart(async (adventureId: string) => {
          const adventure = await adventureStore.getById(adventureId);
          setAdventure(GetAdventureParse(adventure));
          PlayStartSong();
          navigate(ROUTER_PATHS.Game);
          PlayMusic();
          setStarted(false);
          await pvpStore.disconnect();
        });

        await pvpStore.connect();
        const mCharacters = await characterStore.getAllByMode(
          CharacterModeEnum.PvP
        );
        if (mCharacters) setCharacters(mCharacters);
      } else {
        await pvpStore.disconnect();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRoom = async (room: PvPRoomMinimalType) => {
    await pvpStore.join(room.id);
  };

  const handleGoGame = async (room: PvPRoomMinimalType) => {
    const adventure = await adventureStore.getById(room.adventureId!);
    setAdventure(GetAdventureParse(adventure));
    PlayStartSong();
    navigate(ROUTER_PATHS.Game);
    PlayMusic();
    await pvpStore.disconnect();
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose} title="PvP Online">
        <>
          {characters.length < 3 ? (
            <>
              Você deve ter pelo menos 3 personagens PVP's cadastrados para
              jogar
            </>
          ) : (
            <>
              {dataRooms.length === 0 ? (
                <>Nenhuma sala encontrada</>
              ) : (
                <>
                  {dataRooms.filter((room) => room.status === RoomEnum.Started)
                    .length > 0 ? (
                    <S.Title>Em jogo</S.Title>
                  ) : (
                    <></>
                  )}
                  {dataRooms
                    .filter((room) => room.status === RoomEnum.Started)
                    .map((room, index) => (
                      <S.Flag key={index} onClick={() => handleGoGame(room)}>
                        <div className="name">{room.name}</div>
                        <div className="players">
                          {room.playersCount} player(s)
                        </div>
                        <div className="lock">
                          <Icon
                            icon={!room.password ? "uil:unlock" : "uil:lock"}
                          />
                        </div>
                      </S.Flag>
                    ))}

                  <S.Title style={{ marginTop: 25 }}>Salas</S.Title>
                  {dataRooms
                    .filter((room) => room.status === RoomEnum.Waiting)
                    .map((room, index) => (
                      <S.Flag
                        key={index}
                        onClick={() => handleSelectRoom(room)}
                      >
                        <div className="name">{room.name}</div>
                        <div className="players">
                          {room.playersCount} player(s)
                        </div>
                        <div className="lock">
                          <Icon
                            icon={!room.password ? "uil:unlock" : "uil:lock"}
                          />
                        </div>
                      </S.Flag>
                    ))}
                </>
              )}
            </>
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
              onClick={props.onClose}
            />
            <MenuButton
              text="Criar"
              marginBottom="0px"
              width={150}
              onClick={() => setIsOpenCreateRoom(true)}
              disabled={characters.length < 3}
            />
          </Wrapper>
        </>
      </Modal>

      <CreatePvPRoomsView
        isOpen={isOpenCreateRoom}
        onClose={() => setIsOpenCreateRoom(false)}
      />
      {selectedRoom ? (
        <ViewPvPRoomView
          isOpen={isOpenViewRoom}
          onClose={() => setIsOpenViewRoom(false)}
          room={selectedRoom!}
          characters={characters}
          started={started}
        />
      ) : (
        <></>
      )}
    </>
  );
}
