import { Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';
 
const Footer = () => {
  return (
    <Flex
      w="full"
      bg="blackAlpha.50"
      minHeight="16"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      <Text>
        Viklund Dev © {new Date().getFullYear()} - All Rights Reserved
      </Text>
    </Flex>
  );
};
 
export default Footer; 
