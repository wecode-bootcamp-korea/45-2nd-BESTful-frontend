import React, { useState } from 'react';
import styled from 'styled-components';
import UserProfile from '../UserProfile/UserProfile';
import UserContentFeed from '../UserContentFeed/UserContentFeed';
import UserFollower from '../../../../components/UserFollower/UserFollower';
import UserFollowing from '../../../../components/UserFollowing/UserFollowing';

const UserContent = ({
  userData,
  userFollower,
  userFollowing,
  myData,
  myFollowingUser,
  loading,
  userFollowerFetch,
  userFollowingFetch,
  myFollowingUserFetch,
}) => {
  const [userCategory, setUserCategory] = useState(0);

  const myId = myData.id;
  const categoryList = {
    0: <UserContentFeed userId={userData.id} />,
    1: (
      <UserFollower
        userFollower={userFollower}
        myId={myId}
        iFollowing={myFollowingUser}
        setUserCategory={setUserCategory}
        myFollowingUserFetch={myFollowingUserFetch}
      />
    ),
    2: (
      <UserFollowing
        userFollowing={userFollowing}
        myData={myData}
        myFollowingUser={myFollowingUser}
        // followingsFetch={followingsFetch}
        // userFollowingFetch={userFollowingFetch}
      />
    ),
  };

  if (loading) return <div>로딩중...</div>;

  return (
    <Container userCategory={userCategory}>
      <UserProfile
        user={userData}
        userFollower={userFollower}
        userFollowing={userFollowing}
        iFollowing={myFollowingUser}
        setUserCategory={setUserCategory}
        myFollowingUserFetch={myFollowingUserFetch}
      />
      {categoryList[userCategory]}
    </Container>
  );
};

export default UserContent;

const Container = styled.div`
  display: flex;
  justify-content: ${props =>
    props.userCategory === 0 ? 'space-between' : 'center'};
  padding-top: 70px;
  background-color: yellow;
`;
