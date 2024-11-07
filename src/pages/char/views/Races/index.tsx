import { Icon } from "@iconify/react";
import { CharacterType, RaceType } from "../../../../@types/app.types";
import * as S from "./styles";
import { AbilitiesList } from "../../../../shared/ultils/abilitiesList";

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

            <div className="popup">
              {AbilitiesList.map((ability) => (
                <S.Ability>
                  <div className="content-name">
                    <div>{ability.icon}</div>
                    <span>{ability.text}</span>
                    <div className="value">
                      {(race as any)[ability.field as any]}
                    </div>
                  </div>
                </S.Ability>
              ))}
            </div>
          </S.Item>
        ))}
      </S.Content>
    </>
  );
}
