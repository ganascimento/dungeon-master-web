import { Icon } from "@iconify/react";
import { CharacterType, SkillType } from "../../../@types/app.types";
import * as S from "./styles";
import { SkillEnum } from "../../../@types/constants.types";
import {
  CalcProblabyDamage,
  GetBonusFromSkill,
  RenderBonusString,
} from "../../ultils/damageUltils";

type Props = {
  skill: SkillType;
  character: CharacterType;
  setCharacter?: (value: CharacterType) => void;
  canSelect?: boolean;
  selected?: boolean;
  iconPosition?: "normal" | "left";
};

export const SkillDetails = (props: Props) => {
  const getTypeText = () => {
    if (props.skill.type === SkillEnum.Melee) return "Melee";
    if (props.skill.type === SkillEnum.Range) return "Range";
  };

  const getColor = () => {
    if (props.skill.type === SkillEnum.Melee) return "#FF4500";
    if (props.skill.type === SkillEnum.Range) return "#E0FFFF";
  };

  const hasSkill = () =>
    !!props.character?.skills?.find((skill) => skill.id === props.skill.id);

  const handleClick = () => {
    if (hasSkill()) {
      props.setCharacter!({
        ...props.character,
        skills: [...(props.character.skills ?? [])].filter(
          (x) => x.id !== props.skill.id
        ),
      });
      return;
    }
    if (!props.canSelect) return;
    const skills = [...(props.character.skills ?? [])];
    skills.push(props.skill);
    props.setCharacter!({ ...props.character, skills });
  };

  return (
    <S.Content selected={props.selected ?? false}>
      <S.Item
        selected={hasSkill()}
        color={getColor()}
        onClick={props.setCharacter ? handleClick : undefined}
        iconPosition={props.iconPosition ?? "normal"}
      >
        <Icon icon={props.skill.icon} />
        <div className="popup">
          <div className="name">{props.skill.name}</div>
          <div className="type">{getTypeText()}</div>
          <div className="damage">
            {CalcProblabyDamage(props.skill, props.character)} Dano
          </div>
          <div className="dice">
            <Icon icon="game-icons:dice-twenty-faces-twenty" />
            <span>
              {props.skill.damage}
              {RenderBonusString(
                GetBonusFromSkill(props.skill, props.character)
              )}
            </span>
          </div>
        </div>
      </S.Item>
    </S.Content>
  );
};
