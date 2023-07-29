import React from 'react';
import styled from 'styled-components';
import UserFollowerList from './UserFollowerList/UserFollowerList';

const UserFollower = ({
  userFollower,
  myId,
  setUserCategory,
  iFollowing,
  myFollowingUserFetch,
}) => {
  const backToFeed = () => {
    setUserCategory(0);
  };

  return (
    <RealContainer>
      <Back onClick={backToFeed}>&lt; Back</Back>
      <Container>
        <Title>팔로워</Title>
        {(userFollower === undefined || userFollower.length === 0) && (
          <None>팔로워가 없습니다</None>
        )}
        {userFollower !== undefined &&
          userFollower.length > 0 &&
          userFollower.map(follower => (
            <UserFollowerList
              key={follower.id}
              follower={follower}
              myId={myId}
              iFollowing={iFollowing}
              myFollowingUserFetch={myFollowingUserFetch}
              setUserCategory={setUserCategory}
            />
          ))}
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

const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
`;

const None = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
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
