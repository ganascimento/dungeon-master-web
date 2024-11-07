import { Icon } from "@iconify/react";
import { CharacterType, ClassType } from "../../../../@types/app.types";
import * as S from "./styles";
import { AbilitiesList } from "../../../../shared/ultils/abilitiesList";

type Props = {
  classes?: ClassType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function ClassView(props: Props) {
  const handleSelect = (value: ClassType) => {
    props.setCharacter({ ...props.character, class: value, skills: [] });
  };

  return (
    <>
      <S.Title>Selecione a classe do seu persogem</S.Title>
      <S.Content>
        {props.classes?.map((c, index) => (
          <S.Item
            onClick={() => handleSelect(c)}
            selected={c.type === props.character.class?.type}
            key={index}
          >
            <i>
              <Icon icon={c.icon} />
            </i>
            <span>{c.name}</span>

            <div className="popup">
              {AbilitiesList.map((ability) => (
                <S.Ability>
                  <div className="content-name">
                    <div>{ability.icon}</div>
                    <span>{ability.text}</span>
                    <div className="value">
                      {(c as any)[ability.field as any]}
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
