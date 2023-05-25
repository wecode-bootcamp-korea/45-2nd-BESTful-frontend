import React from 'react';
import FollowingDisplay from '../../../components/FollowDisplay/subComponent/FollowElement';
import styled from 'styled-components';

const ProfileBox = () => {
  return (
    <Container>
      <FollowingDisplay EleWidth={70} />
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0px;
`;

export default ProfileBox;
