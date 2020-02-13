import style from './styles.scss';

const Item = ({
  href,
  text,
  icon,
}) => {

  return (
    <a href={href} className={style.item}>
      <i className={`${icon} ${style.fa}`}/>
      <h4>{text}</h4>
    </a>
  );
};

export default Item;
