import React from 'react';
import styled from 'styled-components';
import UserFollowerContent from './UserFollowerContent/UserFollowerContent';

const UserFollower = ({
  userFollower,
  myData,
  setIsAll,
  iFollowing,
  followingsFetch,
  userFollowerFetch,
}) => {
  const setAll = () => {
    setIsAll(true);
  };

  return (
    <RealContainer>
      <Back onClick={setAll}>&lt; Back</Back>
      <Container>
        <UserFollowerContent
          userFollower={userFollower}
          myData={myData}
          iFollowing={iFollowing}
          followingsFetch={followingsFetch}
          userFollowerFetch={userFollowerFetch}
        />
      </Container>
    </RealContainer>
  );
};

export default UserFollower;

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
