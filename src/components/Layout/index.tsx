import type React from "react";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import Nav from "../Nav";
import Footer from "../Footer";

type Props = {
  author?: string;
  description?: string;
  title?: string;
  titlePrefix?: string;
} & FlexProps;

const Layout: React.FC<Props> = (props) => {
  const {
    author = "Daniel Viklund",
    children,
    description = "A Sandbox for several of my personal projects",
    title = "Sandbox",
    titlePrefix = "Viklund.dev",
    ...rest
  } = props;

  return (
    <Flex flexDir="column" minH="100vh" {...rest}>
      <Nav />

      <Box flex="1">
        {children}
      </Box>

      <Footer />
    </Flex>
  )
};

export default Layout;
