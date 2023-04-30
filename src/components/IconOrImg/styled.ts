import styled from "styled-components";

export const Fa = styled.i`
  font-size: 7rem;
`;

export const Image = styled.img<{ isWhite?: boolean; }>`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 0.5rem;

  ${({ isWhite = false }) => isWhite && "background-color: #fff;"}
`;
