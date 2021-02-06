import React, { useCallback, useRef, useState } from 'react';

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

  const ctrlRef = useRef(null);

  const handleClickLeft   = useCallback(() => ctrlRef.current && ctrlRef.current.left(), [ctrlRef]);
  const handleClickUp     = useCallback(() => ctrlRef.current && ctrlRef.current.up(), [ctrlRef]);
  const handleClickRight  = useCallback(() => ctrlRef.current && ctrlRef.current.right(), [ctrlRef]);
  const handleClickDown   = useCallback(() => ctrlRef.current && ctrlRef.current.down(), [ctrlRef]);

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
      <div style={{position: 'relative', height: '400px', width: '400px'}}>
        <SnokGame
          ctrlRef={ctrlRef}
          onGameOver={handleGameOver}
          onGameUpdate={handleGameUpdate}
          onStarted={handleStarted}
          start={start}
        />

        <button
          onClick={handleClickLeft}
          style={{position: 'absolute', left: '100px', top: '172px', background: 'none', border: 'none', fontSize: '3rem', color: 'rgba(0,0,0,0.2)', outline: 'none'}}
        >
          <i className="fa fa-arrow-circle-left"/>
        </button>

        <button
          onClick={handleClickUp}
          style={{position: 'absolute', left: '169px', top: '104px', background: 'none', border: 'none', fontSize: '3rem', color: 'rgba(0,0,0,0.2)', outline: 'none'}}
        >
          <i className="fa fa-arrow-circle-up"/>
        </button>

        <button
          onClick={handleClickRight}
          style={{position: 'absolute', left: '238px', top: '172px', background: 'none', border: 'none', fontSize: '3rem', color: 'rgba(0,0,0,0.2)', outline: 'none'}}
        >
          <i className="fa fa-arrow-circle-right"/>
        </button>

        <button
          onClick={handleClickDown}
          style={{position: 'absolute', left: '169px', top: '242px', background: 'none', border: 'none', fontSize: '3rem', color: 'rgba(0,0,0,0.2)', outline: 'none'}}
        >
          <i className="fa fa-arrow-circle-down"/>
        </button>
      </div>
    </Layout>
  );
};

export default Index;
