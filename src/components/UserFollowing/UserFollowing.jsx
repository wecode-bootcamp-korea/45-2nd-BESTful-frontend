import React from 'react';
import styled from 'styled-components';
import UserFollowingList from './UserFollowingList/UserFollowingList';

const UserFollowing = ({
  userFollowing,
  myId,
  setUserCategory,
  iFollowing,
  myFollowingFetch,
}) => {
  const backToFeed = () => {
    setUserCategory(0);
  };

  return (
    <RealContainer>
      <Back onClick={backToFeed}>&lt; Back</Back>
      <Container>
        <Title>팔로잉</Title>
        <List>
          {(userFollowing === undefined || userFollowing.length === 0) && (
            <None>팔로워가 없습니다</None>
          )}
          {userFollowing !== undefined &&
            userFollowing.length > 0 &&
            userFollowing.map(following => (
              <UserFollowingList
                key={following.id}
                following={following}
                myId={myId}
                iFollowing={iFollowing}
                myFollowingFetch={myFollowingFetch}
              />
            ))}
        </List>
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

const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
`;

const List = styled.div``;

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
