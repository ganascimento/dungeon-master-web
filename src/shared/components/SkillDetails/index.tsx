import { Icon } from "@iconify/react";
import { CharacterType, SkillType } from "../../../@types/app.types";
import * as S from "./styles";
import { SkillEnum } from "../../../@types/constants.types";
import {
  CalcProblabyRoll,
  GetBonusFromSkill,
  RenderBonusString,
} from "../../ultils/damageUltils";

type Props = {
  skill: SkillType;
  character: CharacterType;
  setCharacter?: (value: CharacterType) => void;
  canSelect?: boolean;
  iconPosition?: "normal" | "left";
  isSelected?: boolean;
  disable?: boolean;
};

export const SkillDetails = (props: Props) => {
  const getColor = () => {
    if (props.skill.type === SkillEnum.Melee) return "#FF4500";
    if (props.skill.type === SkillEnum.Range) return "#E0FFFF";
    if (props.skill.type === SkillEnum.Health) return "#28a745";
    if (props.skill.type === SkillEnum.Mage) return "#1E90FF";
    if (props.skill.type === SkillEnum.Passive) return "#F0E68C";
  };

  const getComplement = () => {
    if (props.skill.type === SkillEnum.Health) return "Cura";
    return "Dano";
  };

  const activeSelectedSkill = () => {
    if (props.isSelected) {
      return props.skill.currentTurn === 0;
    }

    return !!props.character?.skills?.find(
      (skill) => skill.id === props.skill.id
    );
  };

  const handleClick = () => {
    if (props.isSelected) {
      if (props.skill.currentTurn !== 0) return;
      props.setCharacter!({
        ...props.character,
        skills: [...(props.character.skills ?? [])].map((x) => {
          if (x.id === props.skill.id) {
            x.selected = !x.selected;
            x.selectedPositions = undefined;
          } else x.selected = false;
          return x;
        }),
      });
      return;
    }
    if (activeSelectedSkill()) {
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
    <S.Content selected={props.skill.selected ?? false}>
      <S.Item
        selected={activeSelectedSkill()}
        color={getColor()}
        onClick={props.setCharacter ? handleClick : undefined}
        iconPosition={props.iconPosition ?? "normal"}
      >
        <Icon icon={props.skill.icon} />
        <div className="popup">
          <div className="name">{props.skill.name}</div>
          <div className="type">{props.skill.typeString}</div>
          {props.skill.description ? (
            <div className="desc">{props.skill.description}</div>
          ) : (
            <></>
          )}

          {props.skill.roll ? (
            <>
              <div className="damage">
                {CalcProblabyRoll(props.skill, props.character)}{" "}
                {getComplement()}
              </div>
              <div className="dice">
                <Icon icon="game-icons:dice-twenty-faces-twenty" />
                <span>
                  {props.skill.roll}
                  {RenderBonusString(
                    GetBonusFromSkill(props.skill, props.character)
                  )}
                </span>
              </div>
            </>
          ) : (
            <></>
          )}

          <S.PropsContent>
            <div className="props">
              <Icon icon="simple-line-icons:energy" /> {props.skill.staminaCost}
            </div>
            <div className="props">
              <Icon icon="typcn:time" /> {props.skill.turns}
            </div>
            {props.skill.range && !props.skill.area ? (
              <div className="props">
                <Icon icon="material-symbols-light:arrow-range" />
                {props.skill.range}
              </div>
            ) : (
              <></>
            )}

            <div className="props">
              <Icon icon="material-symbols-light:target" /> {props.skill.target}
            </div>
            {props.skill.area ? (
              <div className="props">
                <Icon icon="carbon:area" /> {props.skill.area}
              </div>
            ) : (
              <></>
            )}
            {props.skill.duration ? (
              <div className="props">
                <Icon icon="icon-park-outline:application-effect" />{" "}
                {props.skill.duration}
              </div>
            ) : (
              <></>
            )}
          </S.PropsContent>
        </div>
      </S.Item>
      {props.isSelected && props.skill.currentTurn !== 0 ? (
        <S.TurnContent>{props.skill.currentTurn}</S.TurnContent>
      ) : (
        <></>
      )}
      {props.disable ? <S.TurnContent /> : <></>}
    </S.Content>
  );
};
