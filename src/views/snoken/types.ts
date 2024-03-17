import { SnakePainter, SnakePainterOptions } from "snoken";

export enum GameBoard {
  GrassyFields = "Grassy Fields",
  ScorchedEarth = "Scorched Earth",
}

export enum EnumSnake {
  Natrix = "Natrix",
  BlueMamba = "Blue Mamba",
  GhastlyViper = "Ghastly Viper",
}

export type ISnakeConfig = { painter?: SnakePainter; painterOptions?: SnakePainterOptions; };
