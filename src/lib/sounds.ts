import { Howl } from "howler";

export const bgMusic = new Howl({
  src: ["/sounds/game-sound.wav"],
  html5: true,
  loop: true,
  volume: 0.5,
  autoplay: false, // Must be manually started to avoid autoplay restrictions
});

export const cardFlip = new Howl({
  src: ["/sounds/card-flip.mp3"],
  html5: true,
});

export const cardMatch = new Howl({
  src: ["/sounds/card-match.mp3"],
  html5: true,
});

export const gameWon = new Howl({
  src: ["/sounds/game-won.mp3"],
  html5: true,
});

export const incorrectMatch = new Howl({
  src: ["/sounds/incorrect-match.mp3"],
  html5: true,
});

export const gameOver = new Howl({
  src: ["/sounds/game-over.mp3"],
  html5: true,
});
