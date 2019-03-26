import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Workspace from "./Workspace";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: monospace;
    font-size: 1.2rem;
  }
`;

export default () => (
  <>
    <GlobalStyles />
    <Workspace />
  </>
);
