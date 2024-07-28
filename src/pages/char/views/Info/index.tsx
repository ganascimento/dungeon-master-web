import { CharacterType } from "../../../../@types/app.types";
import * as S from "./styles";

type Props = {
  character: CharacterType;
  setCharacter: (value: CharacterType) => void;
};

export default function InfoView(props: Props) {
  const onChangeName = (value: string) => {
    props.setCharacter({ ...props.character, name: value });
  };

  const onChangeDescription = (value: string) => {
    props.setCharacter({ ...props.character, description: value });
  };

  return (
    <>
      <S.Title>Fale um pouco do seu personagem</S.Title>
      <S.Content>
        <S.Input
          type="text"
          value={props.character.name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Digite o nome"
          maxLength={25}
        />
        <S.TextArea
          value={props.character.description}
          onChange={(e) => onChangeDescription(e.target.value)}
          rows={15}
          maxLength={1000}
          placeholder="Conte um pouco sobre o seu personagem"
        />
      </S.Content>
    </>
  );
}
