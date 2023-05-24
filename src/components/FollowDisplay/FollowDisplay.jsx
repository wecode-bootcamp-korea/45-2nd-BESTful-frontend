import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FollowElement from './subComponent/FollowElement';

const FollowDisplay = ({ EleWidth, init, data }) => {
  const src1 = '/images/components/profileImage/brunch.jpg';

  return (
    <Container>
      <Title>{init ? '팔로워' : '팔로잉'}</Title>
      <FollowList>
        {data.map(user => (
          <FollowElement
            key={user.id}
            src={src1}
            name={user.userName}
            width={EleWidth}
            init={init}
            id={user.id}
          />
        ))}
      </FollowList>
    </Container>
  );
};

const Container = styled.div`
  padding: 60px;
  background-color: pink;
  width: 100%;
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
`;

const FollowList = styled.div``;

export default FollowDisplay;
