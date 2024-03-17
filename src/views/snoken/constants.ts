import { SnakePainterOptions } from "snoken";
import { EnumSnake, GameBoard, ISnakeConfig } from "./types";

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

export const snakeConfigs: Record<EnumSnake, ISnakeConfig> = {
  [EnumSnake.Natrix]: { painterOptions: {
    bodyColor: ['rgb(44, 69, 13)', 'rgb(95, 142, 37)'],
    eyeColor: 'rgb(255, 255, 255)',
    headColor: 'rgb(95, 142, 37)',
    tailColor: 'rgb(167, 113, 37)',
    toungueColor: 'rgb(187, 123, 119)',
  } },

  [EnumSnake.BlueMamba]: { painterOptions: {
    bodyColor: ['#387ADF', '#50C4ED'],
    eyeColor: 'rgb(255, 255, 255)',
    headColor: '#333A73',
    tailColor: '#FBA834',
    toungueColor: 'rgb(187, 123, 119)',
  } },
  [EnumSnake.GhastlyViper]: { painterOptions: {
    bodyColor: 'transparent',
    eyeColor: 'rgb(255, 0, 0)',
    headColor: 'rgb(255, 255, 255)',
    tailColor: 'rgb(255, 0, 255)',
    toungueColor: 'rgb(187, 123, 119)',
  } },
};
