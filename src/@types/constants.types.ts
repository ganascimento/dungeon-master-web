export enum CharacterTypeEnum {
  Principal = 1,
  Enemy = 2,
}

export enum AdventureLogEnum {
  Environment = 1,
  Character = 2,
  Damage = 3,
  Initiative = 4,
  Turn = 5,
  Battle = 6,
  Health = 7,
  Skill = 8,
  PhysicalState = 9,
  Win = 10,
  Passive = 11,
  Effect = 12,
}

export enum SkillEnum {
  Melee = 1,
  Range = 2,
  Mage = 3,
  Health = 4,
  Passive = 5,
}

export enum MoveEnum {
  Moviment = 1,
  Skill = 2,
}

export enum BattleEnum {
  InProgress = 1,
  Win = 2,
  Lose = 3,
  Finish = 4,
}

export enum EffectEnum {
  AttackRoll = 1,
  DamageRoll = 2,
  ArmorClass = 3,
  Stamina = 4,
  Bleeding = 5,
  Move = 7,
}

export enum ClassEnum {
  Priest = 1,
  Warrior = 2,
  Mage = 3,
  Archer = 4,
  Warlock = 5,
}
