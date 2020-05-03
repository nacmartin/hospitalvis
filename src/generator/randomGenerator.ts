import { nouns } from "./nouns";
import { adjectives } from "./adjectives";

function shuffleArray<T>(origin: Array<T>): Array<T> {
  const array = [...origin];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function capitalizeFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const generateName = () => {
  const nounsShuffled = shuffleArray(nouns);
  const adjectivesShuffled = shuffleArray(adjectives);
  return `${capitalizeFirst(adjectivesShuffled[0])}${capitalizeFirst(
    nounsShuffled[0],
  )}`;
};

export const generateLat = () => {
  const lat = 42.816666;
  return Math.random() - 0.5 + lat;
};

export const generateLng = () => {
  const lng = -1.65;
  return Math.random() - 0.5 + lng;
};

export const generateState = (): State => {
  return Math.floor(Math.random() * 4) as State;
};
