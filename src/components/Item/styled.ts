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

export const Item = styled.a`
  display: block;
  border-radius: 1rem;
  border: 1px solid #fff;
  text-decoration: none;
  width: 10rem;
  height: 10rem;
  text-align: center;
  color: #fff;
  background-color: #121212;
  padding: 0.5rem;

  img {
    width: 110px;
    height: 110px;
    object-fit: cover;
    border-radius: 0.5rem;

    &.bgWhite {
      background-color: #fff;
    }
  }

  h4 {
    margin-top: 0.5rem;
  }

  &:hover {
    color: rgb(187, 134, 252);
    border-color: rgb(187, 134, 252);
    box-shadow: 0 0 3px 2px rgb(187, 134, 252);;
  }

  &.unknown {

  }
  
  &.pending {
    color: rgb(218, 193, 55);

    img {
      background-color: rgb(218, 193, 55);
    }
  }
  
  &.error {
    color: rgb(218, 55, 55);

    img {
      background-color: rgb(218, 55, 55);
    }
  }
  
  &.stopped {
    color: rgb(218, 120, 55);

    img {
      background-color: rgb(218, 120, 55);
    }
  }
  
  &.running {
    color: rgb(55, 218, 123);

    img {
      background-color: rgb(55, 218, 123);
    }    
  }
`;
