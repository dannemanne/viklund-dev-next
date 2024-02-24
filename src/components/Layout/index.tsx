import type React from "react";
import Head from "next/head";
import { Box, Flex, FlexProps } from "@chakra-ui/react";
import Nav from "../Nav";
import Footer from "../Footer";

type Props = {
  author?: string;
  children?: React.ReactElement;
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
      <Head>
        <title>{`${titlePrefix} | ${title}`}</title>
        <meta name="author" content={author}/>
        <meta name="description" content={description}></meta>
        <link rel="shortcut icon" href="/images/favicon.ico"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
      </Head>

      <Nav />

      <Box flex="1">
        {children}
      </Box>

      <Footer />
    </Flex>
  )
};

export default Layout;
