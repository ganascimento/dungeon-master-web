import music1 from "../../shared/assets/music/music1.mp3";
import music2 from "../../shared/assets/music/music2.mp3";
import music3 from "../../shared/assets/music/music3.mp3";
import music4 from "../../shared/assets/music/music4.mp3";
import music5 from "../../shared/assets/music/music5.mp3";
import music6 from "../../shared/assets/music/music6.mp3";
import music7 from "../../shared/assets/music/music7.mp3";
import music8 from "../../shared/assets/music/music8.mp3";
import music9 from "../../shared/assets/music/music9.mp3";

export const PlayMusic = (lastIdent?: number) => {
  const music = getRandomMusic();

  const audio = new Audio(music.music);
  audio.play();
  audio.volume = 0.1;

  audio.addEventListener("ended", () => {
    PlayMusic(music.ident);
  });

  (globalThis as any).audio = audio;
};

export const PauseMusic = () => {
  const audio: HTMLAudioElement = (globalThis as any).audio;
  if (!audio) return;

  audio.pause();
};

const getRandomNumber = (lastNumber?: number) => {
  const result = Math.floor(Math.random() * (9 - 1 + 1) + 1);
  if (lastNumber === result) getRandomNumber();
  return result;
};

const getRandomMusic = (lastNumber?: number) => {
  const result = getRandomNumber(lastNumber);
  switch (result) {
    case 2:
      return {
        music: music2,
        ident: 2,
      };
    case 3:
      return {
        music: music3,
        ident: 3,
      };
    case 4:
      return {
        music: music4,
        ident: 4,
      };
    case 5:
      return {
        music: music5,
        ident: 5,
      };
    case 6:
      return {
        music: music6,
        ident: 6,
      };
    case 7:
      return {
        music: music7,
        ident: 7,
      };
    case 8:
      return {
        music: music8,
        ident: 8,
      };
    case 9:
      return {
        music: music9,
        ident: 9,
      };
    default:
      return {
        music: music1,
        ident: 1,
      };
  }
};
