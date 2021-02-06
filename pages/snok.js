import React, { useCallback, useState } from 'react';

import Layout from "../components/Layout";
import SnokGame from "../components/SnokGame"

const Index = (props) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [length, setLength] = useState(null);
  const [speed, setSpeed] = useState(0.001);
  const [start, setStart] = useState(true);

  const handleGameUpdate = useCallback(({ score, snake, speed }) => {
    setScore(score);
    setLength(snake.length);
    setSpeed(speed);
  }, []);

  const handleGameOver = useCallback(({ score }) => {
    setHighScore(score);
    setTimeout(() => setStart(true), 3000);
  }, []);

  const handleStarted = useCallback(() => setStart(false), []);

  return (
    <Layout
      description={'Snok (a type of snake in Sweden) is my take on the classical mobile game Snake'}
      title={'Snok'}
    >
      <div className={''}>
        <div>High Score: {highScore}</div>
        <div>Score: {score}</div>
        <div>Length: {length}</div>
        <div>Speed: {speed}</div>
      </div>
      <SnokGame
        onGameOver={handleGameOver}
        onGameUpdate={handleGameUpdate}
        onStarted={handleStarted}
        start={start}
      />
    </Layout>
  );
};

export default Index;
