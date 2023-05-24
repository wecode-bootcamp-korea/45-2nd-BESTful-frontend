import React from 'react';
import styled from 'styled-components';
import FollowerElement from './FollowerElement/FollowerElement';

const FollowerDisplay = ({ EleWidth, init, data }) => {
  return (
    <Container>
      <Title>{init ? '팔로워' : '팔로잉'}</Title>
      <FollowList>
        {data.map(user => (
          <FollowerElement
            key={user.id}
            name={user.userName}
            width={EleWidth}
            initial={init}
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
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
`;

const FollowList = styled.div``;

export default FollowerDisplay;
