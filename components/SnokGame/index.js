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

const draw = (ctx, { snake, boardSize, target }) => {
  const { width, height} = ctx.canvas;
  const [boardW, boardH] = boardSize;
  const [targetX, targetY] = target;

  const segWidth = width / boardW;
  const segHeight = height / boardH;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#000000'

  snake.map(([x,y]) => ctx.fillRect(x * segWidth, y * segHeight, segWidth, segHeight));

  ctx.fillStyle = '#0f0';
  ctx.fillRect(targetX * segWidth, targetY * segHeight, segWidth, segHeight);
}

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

const hasCollission = (snake) => {
  const [head, ...body] = snake;

  return body.some(([x,y]) => x === head[0] && y === head[1]);
};

const createTarget = (boardSize, snake) => {
  const [boardW, boardH] = boardSize;
  
  const target = [
    Math.floor(Math.random() * boardW),
    Math.floor(Math.random() * boardH),
  ];

  const collission = snake.some(([x,y]) => x === target[0] && y === target[1]);

  if (collission) {
    return createTarget(boardSize, snake);
  } else {
    return target;
  }
};

const eatTarget = (snake, target) => {
  return snake[0][0] == target[0] && snake[0][1] == target[1];
};

const SnokGame = (props) => {
  const [snake, setSnake] = useState(DEFAULT_SNAKE)
  const [dir, setDir] = useState([1, 0]);
  const [buffer, setBuffer] = useState(0);
  const [speed, setSpeed] = useState(DEFAULT_SPEED)
  const [boardSize, setBoardSize] = useState(DEFAULT_BORD_SIZE);
  const [target, setTarget] = useState(createTarget(boardSize, snake));
  const [score, setScore] = useState(0);

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

      if (hasCollission(newSnake)) {
        setSnake(DEFAULT_SNAKE);
        setDir([1,0]);
        setSpeed(DEFAULT_SPEED);
        setTarget(createTarget(boardSize, DEFAULT_SNAKE));

      } else if (eatTarget(newSnake, target)) {
        const grownSnake = [...newSnake, snake[snake.length-1]];
        setScore(score + 10);
        setSnake(grownSnake);
        setTarget(createTarget(boardSize, grownSnake));

      } else {
        setSnake(newSnake);
      }
      setBuffer(lapsed - cycles / speed);
    } else {
      setBuffer(lapsed);
    }
  });

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context, { boardSize, snake, target });
  }, [snake, canvasRef, target]);

  return (
    <div className={style.container}>
      <div>Score: {score}</div>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default SnokGame;
