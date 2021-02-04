import React, { useEffect, useRef, useState } from 'react';

import { useAnimationFrame } from './useAnimationFrame';

import style from './styles.scss';

// No. of game cycles per milli second
const DEFAULT_SPEED = 0.005;
const DEFAULT_BORD_SIZE = [20, 20];
const DEFAULT_SNAKE = [
  [5, 9],
  [4, 9],
  [3, 9],
];

const draw = (ctx, { snake, boardSize }) => {
  const { width, height} = ctx.canvas;
  const [boardW, boardH] = boardSize;

  const segWidth = width / boardW;
  const segHeight = height / boardH;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#000000'

  snake.map(([x,y]) => ctx.fillRect(x * segWidth, y * segHeight, segWidth, segHeight));
}

const angleToPos = (angle) => [
  Math.round(Math.cos(angle * Math.PI / 2)),
  Math.round(Math.sin(angle * Math.PI / 2)),
];

const move = (snake, dir, boardSize) => {
  const [boardW, boardH] = boardSize;
  const [firstX, firstY] = snake[0];
  const [dirX, dirY] = dir;

  let nextX = firstX + dirX;
  if (nextX < 0) nextX = boardW-1;
  else if (nextX >= boardW) nextX = 0;

  let nextY = firstY + dirY;
  if (nextY < 0) nextY = boardH-1;
  else if (nextY >= boardH) nextY = 0;

  const body = snake.slice(0, snake.length-1);
  return [ [nextX, nextY], ...body ];
};

const SnokGame = (props) => {
  const [snake, setSnake] = useState(DEFAULT_SNAKE)
  const [angle, setAngle] = useState(0) // Direction angle in radians
  const [dir, setDir] = useState(angleToPos(angle));
  const [buffer, setBuffer] = useState(0);
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [boardSize, setBoardSize] = useState(DEFAULT_BORD_SIZE);

  const canvasRef = useRef(null);
  const eventRef = useRef();

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowLeft': return setDir([-1, 0]);
        case 'ArrowUp': return setDir([0, -1]);
        case 'ArrowRight': return setDir([1, 0]);
        case 'ArrowDown': return setDir([0, 1]);
        default:
      }
    });
  }, []);

  useAnimationFrame(timeDiffMilli => {
    let lapsed = buffer + timeDiffMilli;
    let cycles = Math.floor(lapsed * speed);

    if (cycles > 0) {
      const newSnake = move(snake, dir, boardSize);
      setSnake(newSnake);
      setBuffer(lapsed - cycles / speed);
    } else {
      setBuffer(lapsed);
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context, { boardSize, snake });
  }, [snake, canvasRef]);

  return (
    <div className={style.container}>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default SnokGame;
