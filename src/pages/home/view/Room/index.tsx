/* eslint-disable react-hooks/exhaustive-deps */
import {
  CharacterType,
  RoomMinimalType,
  RoomType,
} from "../../../../@types/app.types";
import { Modal } from "../../../../shared/components/Modal";
import * as S from "./styles";
import { useContext, useEffect, useState } from "react";
import Wrapper from "../../../../shared/components/Wrapper";
import { MenuButton } from "../../../../shared/components/MenuButton";
import { PlayStartSong } from "../../../../shared/ultils/playSong";
import CreateRoomsView from "../CreateRoom";
import { RoomStore } from "../../../../shared/store/room.store";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import ViewRoomView from "../ViewRoom";
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

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function OnlineRoomsView(props: Props) {
  const [, setAdventure] = useContext(AdventureContext);
  const [, setLoading] = useContext(LoaderContext);

  const [isOpenCreateRoom, setIsOpenCreateRoom] = useState(false);
  const [isOpenViewRoom, setIsOpenViewRoom] = useState(false);
  const [dataRooms, setDataRooms] = useState<RoomMinimalType[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<RoomType>();
  const [updateRoom, setUpdateRoom] = useState<RoomMinimalType>();
  const [roomRemoved, setRoomRemoved] = useState<string>();
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [started, setStarted] = useState(false);

  const navigate = useNavigate();
  const roomStore = new RoomStore();
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
      await roomStore.disconnect();
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
        await roomStore.attachRooms((rooms: RoomMinimalType[]) => {
          setDataRooms(rooms);
        });

        await roomStore.attachRoomCreated((room: RoomType) => {
          setSelectedRoom(room);
          setIsOpenViewRoom(true);
        });

        await roomStore.attachRoomCreateError((name: string) => {
          toast.error(`Já existe uma sala com o nome '${name}'`);
        });

        await roomStore.attachRoomRemoved((roomId: string) =>
          setRoomRemoved(roomId)
        );

        await roomStore.attachUpdateRoom((room: RoomMinimalType) =>
          setUpdateRoom(room)
        );

        await roomStore.attachUpdateCurrentRoom((room: RoomType) => {
          setSelectedRoom(room);
          if (!isOpenViewRoom) setIsOpenViewRoom(true);
        });

        await roomStore.attachAdventureLoad(() => {
          setStarted(true);
        });

        await roomStore.attachAdventureStart(async (adventureId: string) => {
          const adventure = await adventureStore.getById(adventureId);
          setAdventure(GetAdventureParse(adventure));
          PlayStartSong();
          navigate(ROUTER_PATHS.Game);
          PlayMusic();
          setStarted(false);
          await roomStore.disconnect();
        });

        await roomStore.connect();
        const mCharacters = await characterStore.getAllByMode(
          CharacterModeEnum.Normal
        );
        if (mCharacters) setCharacters(mCharacters);
      } else {
        await roomStore.disconnect();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRoom = async (room: RoomMinimalType) => {
    await roomStore.join(room.id);
  };

  const handleGoGame = async (room: RoomMinimalType) => {
    const adventure = await adventureStore.getById(room.adventureId!);
    setAdventure(GetAdventureParse(adventure));
    PlayStartSong();
    navigate(ROUTER_PATHS.Game);
    PlayMusic();
    await roomStore.disconnect();
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={props.onClose}
        title="Campanhas co-op"
      >
        <>
          {characters.length === 0 ? (
            <>Você deve ter pelo menos 1 personagem de campanha criado</>
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
              disabled={characters.length === 0}
            />
          </Wrapper>
        </>
      </Modal>

      <CreateRoomsView
        isOpen={isOpenCreateRoom}
        onClose={() => setIsOpenCreateRoom(false)}
      />
      {selectedRoom ? (
        <ViewRoomView
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
