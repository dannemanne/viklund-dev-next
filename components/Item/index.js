import React from 'react';

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
    <a href={href} className={style.item}>
      {iconOrImg()}
      <h4>{text}</h4>
    </a>
  );
};

export default Item;
