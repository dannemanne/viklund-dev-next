"use client";

import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import snokenHero from '../assets/images/snoken.jpg';
import Link from 'next/link';
 
const Hero: FC = () => {
  const [isLargerThan62] = useMediaQuery('(min-width: 62em)');
 
  return (
    <Flex
      alignItems="center"
      w="full"
      px={isLargerThan62 ? '16' : '6'}
      py="16"
      justifyContent="space-between"
      flexDirection={isLargerThan62 ? 'row' : 'column'}
    >
      <Box mr={isLargerThan62 ? '6' : '0'} w={isLargerThan62 ? '60%' : 'full'}>
        <Image src="/images/snoken.svg" maxW="480px" mb="4" />
        {/* <Text
          fontSize={isLargerThan62 ? '5xl' : '4xl'}
          fontWeight="bold"
          mb="4"
        >
          Snoken
        </Text> */}
 
        <Text mb="6" fontSize={isLargerThan62 ? 'lg' : 'base'} opacity={0.7}>
          An old classic with a twist. What are you waiting for?
        </Text>
 
        <Link href="/snoken">
          <Button
            as="span"
            w="200px"
            colorScheme="blue"
            variant="solid"
            h="50px"
            size={isLargerThan62 ? 'lg' : 'md'}
            mb={isLargerThan62 ? '0' : '10'}
          >
            PLAY NOW
          </Button>
        </Link>
      </Box>
 
      <Spacer />
 
      <Flex
        w={isLargerThan62 ? '40%' : 'full'}
        alignItems="center"
        justifyContent="center"
      >
        <Image src={snokenHero.src} alt="Snoken" />
      </Flex>
    </Flex>
  );
};
 
export default Hero;
