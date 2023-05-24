import React from 'react';
import styled from 'styled-components';
import FollowingContent from './FollowingContent/FollowingContent';

const FollowingPage = ({ followingData, me }) => {
  return (
    <Container>
      <FollowingContent followingData={followingData} me={me} />
    </Container>
  );
};

export default FollowingPage;

const Container = styled.div`
  width: 100%;
  padding: 60px;
`;
