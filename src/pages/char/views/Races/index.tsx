import { Icon } from "@iconify/react";
import { CharacterType, RaceType } from "../../../../@types/app.types";
import * as S from "./styles";

type Props = {
  races?: RaceType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function RaceView(props: Props) {
  const handleSelect = (race: RaceType) => {
    props.setCharacter({ ...props.character, race });
  };

  return (
    <>
      <S.Title>Selecione a raça do seu persogem</S.Title>
      <S.Content>
        {props.races?.map((race, index) => (
          <S.Item
            onClick={() => handleSelect(race)}
            selected={race.type === props.character.race?.type}
            key={index}
          >
            <i>
              <Icon icon={race.icon} />
            </i>
            <span>{race.name}</span>
          </S.Item>
        ))}
      </S.Content>
    </>
  );
}
