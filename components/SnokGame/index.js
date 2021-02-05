import React, { useEffect, useRef, useState } from 'react';

import { useAnimationFrame } from './useAnimationFrame';

import style from './styles.scss';

// No. of game cycles per milli second
const SPEED_INCREMENT = 0.001;
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
  
  // Draw board
  const checkeredStyles = ['#a2d149', '#aad751'];
  Array(boardW).fill(null).forEach((_, x) => {
    Array(boardH).fill(null).forEach((_, y) => {
      const idx = (x + y) % 2;
      ctx.fillStyle = checkeredStyles[idx];

      ctx.fillRect(x * segWidth, y * segHeight, segWidth, segHeight);
    });
  });

  // Draw the snake
  const bodyStyles = ['rgb(44, 69, 13)', 'rgb(95, 142, 37)'];
  const tailStyle = 'rgb(167, 113, 37)';
  const [head, ...body] = snake;

  // Start with the head
  ctx.fillStyle = bodyStyles[1];
  const headMargin = 0.1;
  let startX = head[0] * segWidth + segWidth * headMargin;
  let startY = head[1] * segHeight + segWidth * headMargin;
  ctx.fillRect(startX, startY, segWidth * (1 - 2 * headMargin), segHeight * (1 - 2 * headMargin))
  
  // Eyes ...
  ctx.fillStyle = '#fff';
  const diffX = (head[0] - body[0][0]) % boardW;
  const diffY = (head[1] - body[0][1]) % boardH;

  if (diffX === 1 || diffX === -19) {
    // Right
    ctx.fillRect(head[0] * segWidth + segWidth * 0.6, head[1] * segHeight + segHeight * 0.2, segWidth * 0.2, segHeight * 0.2)
    ctx.fillRect(head[0] * segWidth + segWidth * 0.6, head[1] * segHeight + segHeight * 0.6, segWidth * 0.2, segHeight * 0.2)
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(head[0] * segWidth + segWidth * 0.9, head[1] * segHeight + segHeight * 0.45, segWidth * 0.1, segHeight * 0.1)
    }

  } else if (diffX === -1 || diffX === 19) {
    // Left
    ctx.fillRect(head[0] * segWidth + segWidth * 0.2, head[1] * segHeight + segHeight * 0.2, segWidth * 0.2, segHeight * 0.2)
    ctx.fillRect(head[0] * segWidth + segWidth * 0.2, head[1] * segHeight + segHeight * 0.6, segWidth * 0.2, segHeight * 0.2)
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(head[0] * segWidth, head[1] * segHeight + segHeight * 0.45, segWidth * 0.1, segHeight * 0.1)
    }

  } else if (diffY === 1 || diffY === -19) {
    // Down
    ctx.fillRect(head[0] * segWidth + segWidth * 0.2, head[1] * segHeight + segHeight * 0.6, segWidth * 0.2, segHeight * 0.2)
    ctx.fillRect(head[0] * segWidth + segWidth * 0.6, head[1] * segHeight + segHeight * 0.6, segWidth * 0.2, segHeight * 0.2)
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(head[0] * segWidth + segWidth * 0.45, head[1] * segHeight + segHeight * 0.9, segWidth * 0.1, segHeight * 0.1)
    }

  } else if (diffY === -1 || diffY === 19) {
    // Up
    ctx.fillRect(head[0] * segWidth + segWidth * 0.6, head[1] * segHeight + segHeight * 0.2, segWidth * 0.2, segHeight * 0.2)
    ctx.fillRect(head[0] * segWidth + segWidth * 0.2, head[1] * segHeight + segHeight * 0.2, segWidth * 0.2, segHeight * 0.2)
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(head[0] * segWidth + segWidth * 0.45, head[1] * segHeight, segWidth * 0.1, segHeight * 0.1)
    }
  }

  //ctx.fillRect(head[0] * segWidth + segWidth * 0.1, head[1] * segHeight + segWidth * 0.1, segWidth * 0.8, segHeight * 0.8)

  let prev = head;
  body.map(([x,y], i) =>  {
    ctx.fillStyle =  i === body.length - 1 ? tailStyle : bodyStyles[i % 2];
    let startX = x * segWidth + segWidth * 0.2;
    let startY = y * segHeight + segWidth * 0.2;
    let w = segWidth * 0.6;
    let h = segHeight * 0.6;

    if (prev[0] - x == 1) {
      // prev is to the right, just extend the width
      w += segWidth * 0.4;

    } else if (prev[0] - x == -1) {
      // prev is to the left, extend width and adjust x pos
      w += segWidth * 0.4;
      startX -= segWidth * 0.4;

    } else if (prev[1] - y == 1) {
      // prev is below, just extend the height
      h += segWidth * 0.4;

    } else if (prev[1] - y == -1) {
      // prev is above, extend height and adjust y pos
      h += segWidth * 0.4;
      startY -= segWidth * 0.4;
    }

    ctx.fillRect(startX, startY, w, h);

    prev = [x,y];
  });

  ctx.fillStyle = '#e8481d';
  ctx.fillRect(targetX * segWidth + segWidth / 8, targetY * segHeight + segWidth / 8, segWidth * 0.75, segHeight * 0.75);
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

const handleKeyDown = ({ dir, setDir, speed, setSpeed }, e) => {
  console.log(e.code)
  const newDir = {
    'ArrowLeft':  [-1, 0],
    'ArrowUp':    [0, -1],
    'ArrowRight': [1, 0],
    'ArrowDown':  [0, 1],
    'KeyA':       [-1, 0],
    'KeyW':       [0, -1],
    'KeyD':       [1, 0],
    'KeyS':       [0, 1],
  }[e.code];

  if (!newDir)
    return;

  const [x,y] = dir;
  const cx = x + newDir[0];
  const cy = y + newDir[1];

  if (cx === 0 && cy === 0) {
    // Pressed opposite direction key. No turn but slow down
    setSpeed(Math.max(speed - SPEED_INCREMENT, SPEED_INCREMENT));

  } else if (Math.abs(cx) === 2 || Math.abs(cy) === 2) {
    // Pressed same direction key. No turn but speed up
    setSpeed(speed + SPEED_INCREMENT);

  } else {
    setDir(newDir);
  }
}

const SnokGame = (props) => {
  const [snake, setSnake] = useState(DEFAULT_SNAKE)
  const [dir, setDir] = useState([1, 0]);
  const [buffer, setBuffer] = useState(0);
  const [speed, setSpeed] = useState(SPEED_INCREMENT)
  const [boardSize, setBoardSize] = useState(DEFAULT_BORD_SIZE);
  const [target, setTarget] = useState(createTarget(boardSize, snake));
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);

  const canvasRef = useRef(null);
  const eventRef = useRef(null);

  useEffect(() => {
    eventRef.current = handleKeyDown.bind(null, { dir, setDir, speed, setSpeed });
    document.addEventListener('keydown', eventRef.current)
    return () => document.removeEventListener('keydown', eventRef.current);
  }, [dir, speed]);

  useAnimationFrame(timeDiffMilli => {
    let lapsed = buffer + timeDiffMilli;
    let cycles = Math.floor(lapsed * speed);

    if (cycles > 0) {
      const newSnake = move(snake, dir, boardSize);

      if (hasCollission(newSnake)) {
        setSnake(DEFAULT_SNAKE);
        setDir([1,0]);
        setSpeed(SPEED_INCREMENT);
        setTarget(createTarget(boardSize, DEFAULT_SNAKE));
        setHighScore(score);
        setScore(0);

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
      <div>High Score: {highScore}</div>
      <div>Score: {score}</div>
      <div>Length: {snake.length}</div>
      <div>Speed: {Math.round(speed * 1000)}</div>
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default SnokGame;
