import React from 'react';
import styled from 'styled-components';
import FollowerList from '../FollowerList/FollowerList';

const FollowerContent = ({
  followerData,
  me,
  followingData,
  followerFetch,
}) => {
  return (
    <Container>
      <Title>팔로워</Title>
      <List>
        {(followerData === undefined || followerData.length === 0) && (
          <None>팔로워가 없습니다</None>
        )}
        {followerData !== undefined &&
          followerData.length > 0 &&
          followerData.map(follower => (
            <FollowerList
              key={follower.id}
              name={follower.userName}
              src={follower.profileImage}
              id={follower.id}
              follower={follower}
              meId={me.id}
              followingData={followingData}
              followerFetch={followerFetch}
            />
          ))}
      </List>
    </Container>
  );
};

export default FollowerContent;

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
