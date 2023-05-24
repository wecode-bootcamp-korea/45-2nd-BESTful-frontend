import React, { useEffect, useState } from 'react';
import ProfileImage from '../../ProfileImage/ProfileImage';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import FollowerButton from '../FollowerButton/FollowerButton';

const FollowerElement = ({ name = '유저이름', width = '40', initial, id }) => {
  const src = '/images/components/profileImage/brunch.jpg';
  const [following, setFollowing] = useState(initial);

  const handleFollow = id => {
    setFollowing(prev => !prev);
  };

  useEffect(() => {
    setFollowing(initial);
  }, []);

  return (
    <Container>
      <UserInfo>
        <ProfileImage src={src} width={width} />
        <UserName>{name}</UserName>
      </UserInfo>
      <FollowerButton
        width="80px"
        height="30px"
        following={following}
        // setFollowing={setFollowing}
        handleFollow={handleFollow}
        id={id}
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

export default FollowerElement;
