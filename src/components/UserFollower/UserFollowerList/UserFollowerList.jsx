import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import UserFollowerBtn from '../UserFollowerBtn/UserFollowerBtn';
import { API_ADDRESS } from '../../../utils/API_ADDRESS';

const UserFollowerList = ({
  follower,
  iFollowing,
  myId,
  myFollowingUserFetch,
  setUserCategory,
}) => {
  const [followOrNot, setFollowOrNot] = useState(false);
  const [noButton, setNoButton] = useState(false);

  const { userName, profileImage, id } = follower;

  const navigate = useNavigate();

  const onClickUserFollower = () => {
    navigate(`/users/${id}`);
  };

  const followUser = () => {
    const url = `${API_ADDRESS}/follower`;

    fetch(url, {
      method: `${followOrNot ? 'DELETE' : 'POST'}`,
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        followedId: id,
      }),
    });
    myFollowingUserFetch();
  };

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  useEffect(() => {
    if (id === myId) {
      setNoButton(true);
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < iFollowing.length; i++) {
      if (iFollowing[i].id === id) {
        setFollowOrNot(true);
      }
    }
  }, [iFollowing]);

  return (
    <Container>
      <FollowerInfo
        onClick={() => {
          onClickUserFollower();
        }}
      >
        <ProfileImage src={profileImage} width={40} />
        <FollowerName>{userName}</FollowerName>
      </FollowerInfo>
      {noButton ? (
        ''
      ) : (
        <UserFollowerBtn handleBtn={handleBtn} followOrNot={followOrNot} />
      )}
    </Container>
  );
};

export default UserFollowerList;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0px;
`;

const FollowerInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FollowerName = styled.div`
  margin-left: 10px;
  font-weight: bold;
`;
