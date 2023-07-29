import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../../../components/ProfileImage/ProfileImage';
import { API_ADDRESS } from '../../../../utils/API_ADDRESS';

const UserProfile = ({
  user,
  userFollower,
  userFollowing,
  iFollowing,
  myFollowingUserFetch,
  setFollowerOrFollowing,
  setUserCategory,
}) => {
  const [followState, setFollowState] = useState(false);
  const userImage = user?.profileImageUrl;

  const handleFollowerOrFollowing = x => {
    setUserCategory(1);
    setFollowerOrFollowing(x);
  };

  const followUser = () => {
    const url = `${API_ADDRESS}/follower`;

    fetch(url, {
      method: `${followState ? 'DELETE' : 'POST'}`,
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        followedId: user.id,
      }),
    });
    myFollowingUserFetch();
  };

  const handleFollowOrNot = () => {
    followUser();
    setFollowState(prev => !prev);
  };

  useEffect(() => {
    for (let i = 0; i < iFollowing.length; i++) {
      if (iFollowing[i].id === user.id) {
        setFollowState(true);
      }
    }
  }, [iFollowing]);

  return (
    <Container>
      <ProfileImage src={userImage} alt="프로필 이미지" width={100} />
      <ProfileBox>
        <NickName>{user?.userName}</NickName>
        <ButtonBox>
          <FollowButton
            onClick={() => {
              handleFollowerOrFollowing(true);
            }}
          >
            <FollowNumber>{userFollower.length}</FollowNumber>
            follower
          </FollowButton>
          <FollowButton
            onClick={() => {
              handleFollowerOrFollowing(false);
            }}
          >
            <FollowNumber>{userFollowing.length}</FollowNumber>
            following
          </FollowButton>
        </ButtonBox>
        <UserFollowButton followed={followState} onClick={handleFollowOrNot}>
          {followState ? '팔로잉' : '팔로우'}
        </UserFollowButton>
        <Bio>{user?.bio}</Bio>
      </ProfileBox>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  border: 1px solid none;
  border-radius: 10px;
  width: 30%;
  height: 50%;
  background-color: #fff9f4;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const NickName = styled.div`
  font-size: 21px;
  font-weight: bold;
`;

const ButtonBox = styled.div``;

const FollowButton = styled.button`
  margin: 30px 30px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: ${props => props.theme.style.orange};

  &:hover {
    cursor: pointer;
  }
`;

const FollowNumber = styled.div`
  color: black;
  font-size: 21px;
`;

const UserFollowButton = styled.button`
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
  outline: none;
  border: ${props => (props.followed ? '1px solid black' : 'none')};

  background-color: ${props =>
    props.followed ? props.theme.style.white : props.theme.style.orange};
  color: ${props =>
    props.followed ? props.theme.style.black : props.theme.style.white};
  font-size: 15px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

const Bio = styled.div`
  padding-top: 10%;
  width: 70%;
  font-size: 14px;
`;
