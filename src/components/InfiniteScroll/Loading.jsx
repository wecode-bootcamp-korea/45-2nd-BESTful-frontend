import React from 'react';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Background>
      <img
        src="/images/Components/Main/Spinner.gif"
        alt="loading gif"
        width="14%"
      />
    </Background>
  );
};

const Background = styled.div`
  width: 550px;
  padding-left: 175px;
  text-align: center;
`;

export default Loading;
