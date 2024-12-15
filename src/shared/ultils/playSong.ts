import bow from "../../shared/assets/songs/bow.mp3";
import buff from "../../shared/assets/songs/buff.mp3";
import fireballSimple from "../../shared/assets/songs/fireball-simple.mp3";
import fireball from "../../shared/assets/songs/fireball.mp3";
import impact from "../../shared/assets/songs/impact.mp3";
import selectSkill from "../../shared/assets/songs/select-skill.mp3";
import spell from "../../shared/assets/songs/spell.mp3";
import sword from "../../shared/assets/songs/sword.mp3";
import heal from "../../shared/assets/songs/heal.mp3";
import click from "../../shared/assets/songs/click.mp3";
import start from "../../shared/assets/songs/start.mp3";
import finishTurn from "../../shared/assets/songs/finish-turn.mp3";
import next from "../../shared/assets/songs/next.mp3";
import { SkillType } from "../../@types/app.types";

export const PlaySelectSkillSong = () => {
  const audio = new Audio(selectSkill);
  audio.volume = 0.1;
  audio.play();
};

export const PlayClickSong = () => {
  const audio = new Audio(click);
  audio.volume = 0.1;
  audio.play();
};

export const PlayStartSong = () => {
  const audio = new Audio(start);
  audio.volume = 0.5;
  audio.play();
};

export const PlayFinishTurnSong = () => {
  const audio = new Audio(finishTurn);
  audio.volume = 0.8;
  audio.play();
};

export const PlayNextSong = () => {
  const audio = new Audio(next);
  audio.volume = 0.8;
  audio.play();
};

export const PlaySkillSong = (skill: SkillType) => {
  const song = GetSkillSong(skill);
  const audio = new Audio(song);
  audio.volume = 0.5;
  audio.play();
};

const GetSkillSong = (skill: SkillType) => {
  switch (skill.song) {
    case "bow":
      return bow;
    case "buff":
      return buff;
    case "fireballSimple":
      return fireballSimple;
    case "fireball":
      return fireball;
    case "impact":
      return impact;
    case "spell":
      return spell;
    case "sword":
      return sword;
    case "heal":
      return heal;
  }
};
