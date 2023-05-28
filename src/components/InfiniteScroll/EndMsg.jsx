import React from 'react';
import styled from 'styled-components';

const EndMsg = () => {
  return (
    <MsgContainer>
      <CheckImg src="/images/Components/Main/check.png" alt="orange checkbox" />
      <p>모두 확인했습니다</p>
    </MsgContainer>
  );
};

const MsgContainer = styled.div`
  width: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding-left: 175px;
  font-size: 15px;
  padding-bottom: 40px;
`;

const CheckImg = styled.img`
  display: block;
  width: 50px;
  height: 50px;
`;

export default EndMsg;
