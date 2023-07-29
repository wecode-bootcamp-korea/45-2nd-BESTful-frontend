import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import UserFollowingBtn from '../UserFollowingBtn/UserFollowingBtn';
import { API_ADDRESS } from '../../../utils/API_ADDRESS';

const UserFollowingList = ({
  following,
  iFollowing,
  myId,
  myFollowingUserFetch,
}) => {
  const [followOrNot, setFollowOrNot] = useState(false);
  const [noButton, setNoButton] = useState(false);

  const { userName, profileImage, id } = following;

  const navigate = useNavigate();

  const onClickUserFollowing = () => {
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

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  return (
    <Container>
      <FollowerInfo
        onClick={() => {
          onClickUserFollowing();
        }}
      >
        <ProfileImage src={profileImage} width={40} />
        <FollowerName>{userName}</FollowerName>
      </FollowerInfo>
      {noButton ? (
        ''
      ) : (
        <UserFollowingBtn handleBtn={handleBtn} followOrNot={followOrNot} />
      )}
    </Container>
  );
};

export default UserFollowingList;

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
