import type React from "react";
import * as S from "./styled";

type Props = {
  children: React.ReactElement;
};

const Grid: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <S.Container>
      {children}
    </S.Container>
  );
};

export default Grid;
