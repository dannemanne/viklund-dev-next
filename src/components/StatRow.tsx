import { Box, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  label: string;
  value: string;
}

export const StatRow: FC<Props> = ({ label, value }) => {
  return (
    <Flex align="center" px="2">
      <Box w="100px">
        <Text>{label}</Text>
      </Box>
      <Box flex="1">
        <Text>{value}</Text>
      </Box>
    </Flex>
  );;

}