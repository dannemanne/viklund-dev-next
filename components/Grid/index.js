import style from './styles.scss';

const Grid = ({
  children,
}) => {

  return (
    <div className={style.container}>
      {children}
  </div>
  );
};

export default Grid;
