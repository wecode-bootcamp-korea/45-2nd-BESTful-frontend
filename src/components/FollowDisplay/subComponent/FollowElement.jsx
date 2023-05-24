import React, { useState } from 'react';
import ProfileImage from '../../ProfileImage/ProfileImage';
import FollowingButton from '../../followingButton/FollowingButton';
import styled from 'styled-components';
import variables from '../../../styles/variables';

const FollowElement = ({
  name = '유저이름',
  src,
  width = '40',
  buttonInit,
  buttonWidth = '80px',
  buttonHeight = '30px',
}) => {
  const [following, setFollowing] = useState(buttonInit);

  return (
    <Container>
      <UserInfo>
        <ProfileImage src={src} width={width} />
        <UserName>{name}</UserName>
      </UserInfo>
      <FollowingButton
        init={buttonInit}
        width={buttonWidth}
        height={buttonHeight}
        following={following}
        setFollowing={setFollowing}
      />
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
