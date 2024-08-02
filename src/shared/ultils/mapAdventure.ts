import { AdventureType } from "../../@types/app.types";

export const MapAdventure = (adventure: AdventureType): AdventureType => {
  adventure = {
    ...adventure,
    allies: adventure?.allies?.map((ally: any) => {
      ally.race = ally.raceEntity;
      ally.class = ally.classEntity;
      delete ally.raceEntity;
      delete ally.classEntity;

      return ally;
    }),
    character: {
      ...adventure?.character,
      race: (adventure?.character as any)?.raceEntity,
      class: (adventure?.character as any)?.classEntity,
    },
  };

  delete (adventure?.character as any)?.raceEntity;
  delete (adventure?.character as any)?.classEntity;

  return adventure;
};
