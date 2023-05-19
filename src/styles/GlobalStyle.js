import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

* {
  box-sizing: border-box;
}
  a {
  &:visited &:hover &:focus &:active {
    text-decoration: none;
  }
}  body{
      font-family: 'Lato', sans-serif; 
  font-family: 'Noto Sans KR', sans-serif; 
  }

`;

export default GlobalStyle;
