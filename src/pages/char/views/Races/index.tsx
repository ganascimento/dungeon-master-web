import { CharacterType, RaceType } from "../../../../@types/app.types";
import { RaceList } from "../../../../shared/ultils/raceList";
import * as S from "./styles";

type Props = {
  races?: RaceType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function RaceView(props: Props) {
  const handleSelect = (race: RaceType) => {
    props.setCharacter({ ...props.character, raceType: race.type });
  };

  return (
    <>
      <S.Title>Selecione a raça do seu persogem</S.Title>
      <S.Content>
        {props.races?.map((race, index) => (
          <S.Item
            onClick={() => handleSelect(race)}
            selected={race.type === props.character.raceType}
            key={index}
          >
            <i>{RaceList.find((x) => x.race === race.type)?.icon}</i>
            <span>{race.name}</span>
          </S.Item>
        ))}
      </S.Content>
    </>
  );
}
