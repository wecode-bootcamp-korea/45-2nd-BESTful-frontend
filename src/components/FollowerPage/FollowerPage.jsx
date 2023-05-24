import React from 'react';
import styled from 'styled-components';
import FollowerContent from './FollowerContent/FollowerContent';

const FollowerPage = ({ followerData, me, followingData }) => {
  return (
    <Container>
      <FollowerContent
        followerData={followerData}
        me={me}
        followingData={followingData}
      />
    </Container>
  );
};

export default FollowerPage;

const Container = styled.div`
  width: 100%;
  padding: 60px;
`;
