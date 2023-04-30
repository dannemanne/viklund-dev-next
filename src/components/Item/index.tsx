import type React from 'react';
import Link from 'next/link';
import IconOrImg from '../IconOrImg';
import * as S from "./styled";

type Props = {
  href?: string;
  icon: string;
  imageSrc: string;
  imageWhite?: boolean;
  onClick?: (e: any) => void;
  status?: string;
  text: string;
};

const Item: React.FC<Props> = (props) => {
  const {
    href,
    icon,
    imageSrc,
    imageWhite = false,
    onClick,
    status,
    text,
  } = props;

  if (href && !href.match(/^http/)) {
    return (
      <Link href={href}>
        <S.Item>
          <IconOrImg icon={icon} imageSrc={imageSrc} imageWhite={imageWhite} />
            <h4>{text}</h4>
          </S.Item>
      </Link>
    );
  }

  return (
    <S.Item href={href}>
      <IconOrImg icon={icon} imageSrc={imageSrc} imageWhite={imageWhite} />
      <h4>{text}</h4>
    </S.Item>
  );
};

export default Item;
