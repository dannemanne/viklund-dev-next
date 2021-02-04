import React from 'react';
import Link from 'next/link';

import style from './styles.scss';

const Item = (props) => {
  const {
    href,
    icon,
    imageSrc,
    imageWhite = false,
    text,
  } = props;

  function iconOrImg() {
    if (icon) {
      return <i className={`${icon} ${style.fa}`}/>;
    } else if (imageSrc) {
      return <img src={imageSrc} className={imageWhite ? style.bgWhite : null} />;
    } else
      return null;
  }

  return (
    <Link href={href}>
      <a className={style.item}>
        {iconOrImg()}
        <h4>{text}</h4>
      </a>
    </Link>
  );
};

export default Item;
