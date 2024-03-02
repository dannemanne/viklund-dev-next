import { GameBoard } from "./types";

export const boardConfigs = {
  [GameBoard.GrassyFields]: {
    backgroundImage: "url('/images/grassy-fields.jpg')",
    colors: ['#a2d149', '#aad751'],
  },
  [GameBoard.ScorchedEarth]: {
    backgroundImage: "url('/images/scorched-earth.jpg')",
    colors: ["#FF5722", "#607D8B"],
  },
}