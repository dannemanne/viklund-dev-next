import styled from "styled-components";

export const Container = styled.div`
  grid-area: 'main';
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;

  @media only screen and (max-width: 640px) {
    grid-template-columns: 1fr;
  }  
`;
