import React from 'react';
import styled from 'styled-components';
import FollowerContent from './FollowerContent/FollowerContent';

const FollowerPage = ({ followerData, me, followingData, followerFetch }) => {
  return (
    <Container>
      <FollowerContent
        followerData={followerData}
        me={me}
        followingData={followingData}
        followerFetch={followerFetch}
      />
    </Container>
  );
};

export default FollowerPage;

const Container = styled.div`
  width: 100%;
  padding: 60px;
`;
