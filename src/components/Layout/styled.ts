import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  min-height: 100vh;
  background-color: rgba(40, 44, 52, 0.9);
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 3fr;
  grid-template-areas: "header header header" "left main right" "footer footer footer";
`;

export const Content = styled.div`
  max-width: 1024;
  grid-area: main;
`;

export const Unsplash = styled.a`
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: black;
  color: white;
  text-decoration: none;
  padding: 4px 6px;
  font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, Ubuntu, Roboto, Noto, "Segoe UI", Arial, sans-serif;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.2;
  display: inline-block;
  border-radius: 3px;

  span {
    display: inline-block;
    padding: 2px 3px;
  }

  svg {
    height: 12px;
    width: auto;
    position: relative;
    vertical-align: middle;
    top: -2px;
    fill: white;
  }
`;
