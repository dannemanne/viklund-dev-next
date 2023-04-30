import type React from "react";
import Head from "next/head";
import * as S from "./styled";

const footerStyle = {
    gridArea: 'footer',
};

type Props = {
  author?: string;
  children?: React.ReactElement;
  description?: string;
  title?: string;
  titlePrefix?: string;
};

const Layout: React.FC<Props> = (props) => {
  const {
    author = "Daniel Viklund",
    children,
    description = "A Sandbox for several of my personal projects",
    title = "Sandbox",
    titlePrefix = "Viklund.dev",
  } = props;

  return (
    <S.Container>
      <Head>
        <title>{titlePrefix}{' | '}{title}</title>
        <meta name="author" content={author}/>
        <meta name="description" content={description}></meta>
        <link rel="shortcut icon" href="/images/favicon.ico"></link>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
        <link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
      </Head>

      <S.Content>
        {children}
      </S.Content>

      <S.Unsplash
        href="https://unsplash.com/@markusspiske?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge"
        target="_blank"
        title="Download free do whatever you want high-resolution photos from Markus Spiske"
      >
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <title>unsplash-logo</title>
            <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
            </svg>
        </span>
        <span>Photo by Markus Spiske</span>
      </S.Unsplash>
    </S.Container>
  )
  };

export default Layout;
