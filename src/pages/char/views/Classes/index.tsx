import { CharacterType, ClassType } from "../../../../@types/app.types";
import { ClassList } from "../../../../shared/ultils/classList";
import * as S from "./styles";

type Props = {
  classes?: ClassType[];
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function ClassView(props: Props) {
  const handleSelect = (value: ClassType) => {
    props.setCharacter({ ...props.character, classType: value.type });
  };

  return (
    <>
      <S.Title>Selecione a classe do seu persogem</S.Title>
      <S.Content>
        {props.classes?.map((c, index) => (
          <S.Item
            onClick={() => handleSelect(c)}
            selected={c.type === props.character.classType}
            key={index}
          >
            <i>{ClassList.find((x) => x.class === c.type)?.icon}</i>
            <span>{c.name}</span>
          </S.Item>
        ))}
      </S.Content>
    </>
  );
}
