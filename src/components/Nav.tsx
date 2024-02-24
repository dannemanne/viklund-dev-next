import React, { useCallback, useEffect, useState } from 'react';
import { Text, Flex, Spacer, Image } from '@chakra-ui/react';
import Link from 'next/link';
 
const Nav = () => {
  const [scroll, setScroll] = useState(false);
 
  const changeScroll = useCallback(() => {
    if (typeof document === 'undefined') return;

    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);
    }, []);

    useEffect(() => {
      window.addEventListener('scroll', changeScroll);
      return () => window.removeEventListener('scroll', changeScroll);
    }, [changeScroll]);
  
  return (
    <Flex
      h="16"
      alignItems="center"
      p="6"
      boxShadow={scroll ? 'base' : 'none'}
      position="sticky"
      top="0"
      zIndex="sticky"
      w="full"
      gap="4"
      bg="blackAlpha.500"
    >
      <Link href="/">
        <a>
          <Image src="/images/logo-no-background.png" alt="Logo" height="10" />
        </a>
      </Link>
 
      <Spacer />
 
      <Flex alignItems="center">
      </Flex>
    </Flex>
  );
};
 
export default Nav; 
