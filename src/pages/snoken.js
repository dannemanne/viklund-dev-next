import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Snoken from "snoken";

import Layout from "../components/Layout";
import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { StatRow } from '../components/StatRow'

const SnokenIndex = (props) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [length, setLength] = useState(null);
  const [speed, setSpeed] = useState(0.001);
  const [start, setStart] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let localUserId = localStorage.getItem('snoken-user-id');
    let address;
    
    if (!localUserId) {
      localUserId = crypto.randomUUID();
      localStorage.setItem('snoken-user-id', localUserId);
      address = prompt("Enter your wallet address to identify your account");
    }

    axios.post("/api/snoken/start", { userId: localUserId, address }).catch(() => {});

    setUserId(localUserId);
  }, []);

  const handleClickUpdateWallet = useCallback(() => {
    let localUserId = localStorage.getItem('snoken-user-id');
    if (!localUserId) {
      localUserId = crypto.randomUUID();
      localStorage.setItem('snoken-user-id', localUserId);
    }
    const address = prompt("Enter your wallet address to identify your account");

    axios.post("/api/snoken/start", { userId: localUserId, address }).catch(() => {});

    setUserId(localUserId);
  }, []);

  const handleGameUpdate = useCallback((event) => {
    if (length && event.snake.length > length) {
      axios.post("/api/snoken/track", { userId, event: 'KILL', groupId, traits: { mob: 'apple', speed } }).catch(() => {});
    }
    setScore(event.score);
    setLength(event.snake.length);
    setSpeed(event.speed);
  }, [length, groupId]);

  const handleGameOver = useCallback(async ({ score }) => {
    setIsRunning(false);
    setGroupId(null);

    try {
      await axios.post("/api/snoken/track", { userId, event: 'GAME_SCORE', value: score, groupId });
    } catch (err) {
      console.log(err)
    }

    if (score > highScore) {
      setHighScore(score);
    }
  }, [highScore, userId, groupId]);

  const handleStarted = useCallback(() => {
    setStart(false);
    setIsRunning(true);
  }, []);

  const ctrlRef = useRef(null);

  const handleClickLeft   = useCallback(() => ctrlRef.current && ctrlRef.current.left(), [ctrlRef]);
  const handleClickUp     = useCallback(() => ctrlRef.current && ctrlRef.current.up(), [ctrlRef]);
  const handleClickRight  = useCallback(() => ctrlRef.current && ctrlRef.current.right(), [ctrlRef]);
  const handleClickDown   = useCallback(() => ctrlRef.current && ctrlRef.current.down(), [ctrlRef]);

  const handleClickStart = useCallback(() => {
    const uuid = crypto.randomUUID();
    setGroupId(uuid);

    setStart(true);
  }, []);

  return (
    <Layout
      description={'Snok (a type of snake in Sweden) is my take on the classical mobile game Snake'}
      title={'Snok'}
      backgroundImage="/images/grassy-fields.jpg"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <a
        href="https://github.com/dannemanne/snoken"
        className="github-corner"
        aria-label="View source on GitHub"
      >
        <svg
          width="80" height="80" viewBox="0 0 250 250"
          style={{fill: '#fff', color: '#151513', position: 'absolute', top: 0, border: 0, right: 0}}
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: '130px 106px'}} className="octo-arm"/>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"/>
        </svg>
      </a>

      <Center flexDir="column" mt="10" gap="4">
        <Flex bg="gray.800" borderColor="gray.900" borderWidth="1px" borderRadius="md" w="440px">
          <Box flex="1">
            <StatRow label="High Score" value={highScore} />
            <StatRow label="Score" value={score} />
            <StatRow label="Length" value={length} />
            <StatRow label="Speed" value={speed} />
          </Box>

          <Flex flex="1" p="4" flexDir="column" alignItems="flex-end">
            <Button size="sm" onClick={handleClickUpdateWallet}>Update Account Wallet</Button>
          </Flex>
        </Flex>

        <Center position='relative' height='440px' width='440px' bg="gray.900" borderRadius="md">
          <Snoken
            ctrlRef={ctrlRef}
            onGameOver={handleGameOver}
            onGameUpdate={handleGameUpdate}
            onStarted={handleStarted}
            start={start}
          />

          {isRunning ? (
            <>
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
            </>
          ) : (
            <button
              onClick={handleClickStart}
              style={{position: 'absolute', left: '180px', top: '180px', background: 'none', border: 'none', fontSize: '3rem', color: 'rgba(0,128,0,1)', outline: 'none', cursor: 'pointer'}}
            >
              <i className="fa fa-play-circle"/>
            </button>
          )}
        </Center>
      </Center>
    </Layout>
  );
};

export default SnokenIndex;
