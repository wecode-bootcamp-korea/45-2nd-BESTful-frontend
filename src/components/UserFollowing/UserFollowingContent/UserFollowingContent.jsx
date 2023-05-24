import React from 'react';
import styled from 'styled-components';
import UserFollowingList from '../UserFollowingList/UserFollowingList';

const UserFollowingContent = ({ userFollowing, myData, iFollowing }) => {
  return (
    <Container>
      <Title>팔로잉</Title>
      <List>
        {(userFollowing === undefined || userFollowing.length === 0) && (
          <None>팔로워가 없습니다</None>
        )}
        {userFollowing !== undefined &&
          userFollowing.length > 0 &&
          userFollowing.map(follower => (
            <UserFollowingList
              key={follower.id}
              name={follower.userName}
              src={follower.src}
              id={follower.id}
              follower={follower}
              meId={myData.id}
              iFollowing={iFollowing}
            />
          ))}
      </List>
    </Container>
  );
};

export default UserFollowingContent;

const Container = styled.div``;
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
