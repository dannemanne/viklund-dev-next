"use client";

import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Snoken, { Control } from "snoken";

import Layout from "../../components/Layout";
import { AbsoluteCenter, Box, Button, Center, Flex, Image, Input, InputGroup, InputLeftAddon, Select, Text, useDimensions } from '@chakra-ui/react';
import { StatRow } from '../../components/StatRow'
import { EnumSnake, GameBoard } from './types';
import { boardConfigs, snakeConfigs } from './constants';
import { StartGameModal } from './StartGameModal';
import { maskMiddleText, targetPainterEarnAlliance } from './utils';

export const SnokenView: FC = () => {
  const [board, setBoard] = useState(GameBoard.GrassyFields);
  const [snake, setSnake] = useState(EnumSnake.Natrix);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [length, setLength] = useState(3);
  const [speed, setSpeed] = useState(0.001);
  const [totalMoves, setTotalMoves] = useState(0);
  const [start, setStart] = useState(false);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(elementRef, true)

  useEffect(() => {
    let localUserId = localStorage.getItem('snoken-user-id');

    if (!localUserId) {
      localUserId = crypto.randomUUID();
      localStorage.setItem('snoken-user-id', localUserId);
    }

    const walletAddress = localStorage.getItem('snoken-user-wallet-address');
    if (walletAddress) {
      setWalletAddress(walletAddress);
    }

    setUserId(localUserId);
  }, []);

  const handleChangeWalletAddress = useCallback((address: string) => {
    let localUserId = localStorage.getItem('snoken-user-id');
    setWalletAddress(address);
    localStorage.setItem('snoken-user-wallet-address', address);
    axios.post("/api/snoken/start", { userId: localUserId, address }).catch(() => {});
  }, []);

  const handleGameUpdate = useCallback<(params: {
    score: number;
    snake: any;
    speed: number;
    totalMoves: number;
  }) => void>((event) => {
    if (length && event.snake.length > length) {
      // axios.post("/api/snoken/track", { userId, event: 'KILL', groupId, traits: { mob: 'apple', speed } }).catch(() => {});
    }
    setScore(event.score);
    setLength(event.snake.length);
    setSpeed(event.speed);
    setTotalMoves(event.totalMoves);
  }, [length, groupId]);

  const handleGameOver = useCallback<(params: {
    score: number;
    speed: number;
    length: number;
  }) => void>(async ({ score }) => {
    setIsRunning(false);
    setGroupId(null);

    try {
      await axios.post("/api/snoken/track", { userId, event: 'GAME_SCORE', value: score, groupId, traits: { board, snake, length } });
    } catch (err) {
      console.log(err)
    }

    if (score > highScore) {
      setHighScore(score);
    }
  }, [board, highScore, snake, userId, groupId]);

  const handleStarted = useCallback(() => {
    setStart(false);
    setIsRunning(true);
  }, []);

  const ctrlRef = useRef<Control | null>(null);

  const handleClickLeft   = useCallback(() => ctrlRef.current?.left(), [ctrlRef]);
  const handleClickUp     = useCallback(() => ctrlRef.current?.up(), [ctrlRef]);
  const handleClickRight  = useCallback(() => ctrlRef.current?.right(), [ctrlRef]);
  const handleClickDown   = useCallback(() => ctrlRef.current?.down(), [ctrlRef]);

  const handleClickStart = useCallback(() => {
    const uuid = crypto.randomUUID();
    setGroupId(uuid);

    setIsOpen(false);
    setStart(true);
    axios.post("/api/snoken/track", { userId, event: 'GAME_START', groupId: uuid, traits: { board, snake } }).catch(() => {});
  }, [board, snake, userId]);

  return (
    <Layout
      description={'Snok (a type of snake in Sweden) is my take on the classical mobile game Snake'}
      title={'Snok'}
      backgroundImage={boardConfigs[board]?.backgroundImage}
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
          style={{fill: '#fff', color: '#151513', position: 'absolute', top: 0, border: 0, right: 0, zIndex: 10000}}
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"/>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{transformOrigin: '130px 106px'}} className="octo-arm"/>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"/>
        </svg>
      </a>

      <Center flexDir="column" mt="10" gap="4">
        <Image src="/images/snoken.svg" maxW="360px" mb="4" alt="SNOKEN" />

        <Flex bg="gray.800" borderColor="gray.900" borderWidth="1px" borderRadius="md" maxW="640px" w="full" flexDir={{base: 'column', md: 'row'}}>
          <Box flex="1" order={{base: '2', lg: '1'}}>
            <StatRow label="High Score" value={highScore} />
            <StatRow label="Score" value={score} />
            <StatRow label="Length" value={length} />
            <StatRow label="Speed" value={speed} />
            <StatRow label="Moves" value={totalMoves} />
            <Text px="2" fontSize="sm" color="gray.400" mb="2" fontStyle="italic">
              You get more points by going faster, but the points for each target are reduced for each move you make.
            </Text>
          </Box>

          <Flex flex="1" p="4" flexDir="column" alignItems="flex-end" gap="2" order={{base: '1', lg: '2'}}>
            <InputGroup>
              <InputLeftAddon w="120px">
                Wallet
              </InputLeftAddon>
              <Input value={maskMiddleText(walletAddress)} disabled />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon w="120px">
                Game Board
              </InputLeftAddon>
              <Input value={board} disabled />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon w="120px">
                Snake
              </InputLeftAddon>
              <Input value={snake} disabled />
            </InputGroup>
          </Flex>
        </Flex>

        <Center ref={elementRef} position='relative' aspectRatio={1} maxW='640px' w="full" borderColor="gray.900" borderWidth="16px" borderRadius="md">
          <AbsoluteCenter bg={boardConfigs[board]?.colors?.[0]}>
            <Snoken
              boardPainterOptions={{colors: boardConfigs[board]?.colors}}
              ctrlRef={ctrlRef}
              height={dimensions?.contentBox.height || 400}
              onGameOver={handleGameOver}
              onGameUpdate={handleGameUpdate}
              onStarted={handleStarted}
              snakePainter={snakeConfigs[snake]?.painter}
              snakePainterOptions={snakeConfigs[snake]?.painterOptions}
              start={start}
              targetPainter={targetPainterEarnAlliance}
              width={dimensions?.contentBox.width || 400}
            />
          </AbsoluteCenter>

          {isRunning ? null : (
            <Button
              variant="unstyled"
              fontSize="3rem"
              color={"rgba(0,64,0,1)"}
              height={"12"}
              lineHeight="100%"
              onClick={() => setIsOpen(true)}
              _active={{color: 'rgba(0,64,0,0.8)'}}
            >
              <i className="fa fa-play-circle"/>
            </Button>
          )}

          {isOpen && (
            <StartGameModal
              gameBoard={board}
              onChangeGameBoard={setBoard}
              onChangeSnake={setSnake}
              onChangeWalletAddress={handleChangeWalletAddress}
              onClickStart={handleClickStart}
              onClose={() => setIsOpen(false)}
              snake={snake}
              walletAddress={walletAddress}
            />
          )}
        </Center>

        <Flex bg="gray.800" borderColor="gray.900" borderWidth="1px" flex="1" borderRadius="md" maxW="640px" w="full" flexDir="column" order={{base: '2', lg: '1'}}>
          <Center aspectRatio="1" p="4" alignSelf="center" display="grid" gridTemplateColumns="1fr 1fr 1fr" gridTemplateRows="1fr 1fr 1fr" gridTemplateAreas={`
            "tl tc tr"
            "ml mc mr"
            "bl bc br"
          `}>
            <Button
              variant="unstyled"
              gridArea="ml"
              fontSize="3rem"
              color={"rgba(255,255,255,0.8)"}
              _active={{color: 'rgba(255,255,255,0.5)'}}
              height={"12"}
              lineHeight="100%"
              onClick={handleClickLeft}
            >
              <i className="fa fa-arrow-circle-left"/>
            </Button>

            <Button
              variant="unstyled"
              gridArea="tc"
              fontSize="3rem"
              color={"rgba(255,255,255,0.8)"}
              _active={{color: 'rgba(255,255,255,0.5)'}}
              height={"12"}
              lineHeight="100%"
              onClick={handleClickUp}
            >
              <i className="fa fa-arrow-circle-up"/>
            </Button>

            <Button
              variant="unstyled"
              gridArea="mr"
              fontSize="3rem"
              color={"rgba(255,255,255,0.8)"}
              _active={{color: 'rgba(255,255,255,0.5)'}}
              height={"12"}
              lineHeight="100%"
              onClick={handleClickRight}
            >
              <i className="fa fa-arrow-circle-right"/>
            </Button>

            <Button
              variant="unstyled"
              gridArea="bc"
              fontSize="3rem"
              color={"rgba(255,255,255,0.8)"}
              _active={{color: 'rgba(255,255,255,0.5)'}}
              height={"12"}
              lineHeight="100%"
              onClick={handleClickDown}
            >
              <i className="fa fa-arrow-circle-down"/>
            </Button>
          </Center>

          <Text px="2" fontSize="sm" color="gray.400" mb="2" fontStyle="italic">
            Control the snake with W, A, S, D, the arrow keys or the buttons above. Collect the targets to grow and earn points. Avoid hitting yourself.
          </Text>
        </Flex>
      </Center>
    </Layout>
  );
};
