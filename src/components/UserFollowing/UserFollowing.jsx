import React from 'react';
import styled from 'styled-components';
import UserFollowingContent from './UserFollowingContent/UserFollowingContent';

const UserFollowing = ({ userFollowing, myData, setIsAll, iFollowing }) => {
  const setAll = () => {
    setIsAll(true);
  };

  return (
    <RealContainer>
      <Back onClick={setAll}>&lt; Back</Back>
      <Container>
        <UserFollowingContent
          userFollowing={userFollowing}
          myData={myData}
          iFollowing={iFollowing}
        />
      </Container>
    </RealContainer>
  );
};

export default UserFollowing;

const RealContainer = styled.div`
  margin-bottom: 50px;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 60px 60px 60px;
`;

const Back = styled.div`
  padding-bottom: 40px;
  width: 50px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    color: ${props => props.theme.style.orange};
  }
`;
