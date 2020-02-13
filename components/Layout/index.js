import Head from "next/head";

import classNames from 'classnames';

import style from './styles.scss';

const footerStyle = {
    gridArea: 'footer',
};

const Layout = props => (
  <div className={classNames('Layout', style.layout)}>
    <Head>
      <title>Viklund.dev | Sandbox</title>
      <meta name="author" content="Daniel Viklund"></meta>
      <meta name="description" content="A Sandbox for several of my personal projects"></meta>
      <link rel="shortcut icon" href="/favicon.ico"></link>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans" />
      <link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
    </Head>
    <div className={classNames('Content', style.content)}>
      {props.children}
    </div>
    <a className={style.unsplash} href="https://unsplash.com/@markusspiske?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" title="Download free do whatever you want high-resolution photos from Markus Spiske">
    <span style={{display:'inline-block', padding: '2px 3px'}}>
        <svg xmlns="http://www.w3.org/2000/svg" style={{height: '12px', width: 'auto', position: 'relative', verticalAign: 'middle', top: '-2px', fill: 'white'}} viewBox="0 0 32 32">
        <title>unsplash-logo</title>
        <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
        </svg>
    </span>
    <span style={{display:'inline-block',padding: '2px 3px'}}>Photo by Markus Spiske</span>
    </a>
  </div>
);

export default Layout;
