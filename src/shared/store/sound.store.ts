import { SoundType } from "../../@types/app.types";

const STORAGE_KEY = "@#SOUND_STORAE_KEY#@";
const BASE_CONFIG: SoundType = {
  enable: true,
  volume: 0.1,
};

export class SoundStore {
  getBaseConfig(): SoundType {
    return BASE_CONFIG;
  }

  getConfig(): SoundType {
    const config = localStorage.getItem(STORAGE_KEY);
    if (!config) return BASE_CONFIG;

    return JSON.parse(config);
  }

  setConfig(config: SoundType): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }
}
