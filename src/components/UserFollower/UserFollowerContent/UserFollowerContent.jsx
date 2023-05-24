import React from 'react';
import styled from 'styled-components';
import UserFollowerList from '../UserFollowerList/UserFollowerList';

const UserFollowerContent = ({ userFollower, myData, iFollowing }) => {
  return (
    <Container>
      <Title>팔로워</Title>
      <List>
        {(userFollower === undefined || userFollower.length === 0) && (
          <None>팔로워가 없습니다</None>
        )}
        {userFollower !== undefined &&
          userFollower.length > 0 &&
          userFollower.map(follower => (
            <UserFollowerList
              key={follower.id}
              name={follower.userName}
              src={follower.src}
              id={follower.id}
              follower={follower}
              isFollowOrNot={follower.follow}
              meId={myData.id}
              iFollowing={iFollowing}
            />
          ))}
      </List>
    </Container>
  );
};

export default UserFollowerContent;

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
