import type React from "react";
import * as S from "./styled";

type Props = {
  icon?: string;
  imageSrc?: string;
  imageWhite?: boolean;
};

const IconOrImg: React.FC<Props> = (props) => {
  const { icon, imageSrc, imageWhite } = props;

  if (icon) {
    return <S.Fa className={icon} />;
  } else if (imageSrc) {
    return <S.Image src={imageSrc} isWhite={imageWhite} />;
  } else
    return null;
};

export default IconOrImg;
