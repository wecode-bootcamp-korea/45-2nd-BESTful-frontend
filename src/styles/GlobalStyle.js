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
}    
body{
  max-width: 1050px;
  margin: 0 auto;
  font-family: 'Lato', sans-serif; 
  font-family: 'Noto Sans KR', sans-serif; 
  }

`;

export default GlobalStyle;
