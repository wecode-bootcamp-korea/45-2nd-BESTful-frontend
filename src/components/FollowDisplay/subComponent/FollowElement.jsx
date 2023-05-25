import React from 'react';
import ProfileImage from '../../ProfileImage/ProfileImage';
import FollowingButton from '../../followingButton/FollowingButton';

import styled from 'styled-components';
import variables from '../../../styles/variables';

const FollowElement = ({ name }) => {
  const src = '/images/components/profileImage/brunch.jpg';
  return (
    <Container>
      <UserInfo>
        <ProfileImage src={src} width={40} />
        <UserName>{name}</UserName>
      </UserInfo>
      <FollowingButton init={false} width="80px" height="30px" />
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('row', 'space-between')}
  padding: 10px 0px;
`;

const UserInfo = styled.div`
  ${variables.flex('row', 'center', 'center')}
`;

const UserName = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;

export default FollowElement;
