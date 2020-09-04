import style from './styles.scss';

const Item = ({
  href,
  text,
  icon,
  imageSrc,
  imageWhite = false,
}) => {
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
