import React from 'react';
import styled from 'styled-components';
import FollowingContent from './FollowingContent/FollowingContent';

const FollowingPage = ({ followingData, me, followingFetch }) => {
  return (
    <Container>
      <FollowingContent
        followingData={followingData}
        me={me}
        followingFetch={followingFetch}
      />
    </Container>
  );
};

export default FollowingPage;

const Container = styled.div`
  width: 100%;
  padding: 60px;
`;
