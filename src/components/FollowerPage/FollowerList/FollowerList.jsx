import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import { API_ADDRESS } from '../../../utils/API_ADDRESS';
import FollowingButton from '../../followingButton/FollowingButton';

const FollowerList = ({
  follower,
  followingData,
  followingFetch,
  followerOrFollowing,
}) => {
  const [followOrNot, setFollowOrNot] = useState(false);

  const { userName, profileImage, id } = follower;

  const navigate = useNavigate();

  const onClickFollowerUser = () => {
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
    }).catch(error => {
      console.error(error); // Error handling
    });
    followingFetch();
  };

  useEffect(() => {
    if (followerOrFollowing) {
      for (let i = 0; i < followingData.length; i++) {
        if (followingData[i].id === id) {
          setFollowOrNot(true);
        }
      }
    }
  }, [followerOrFollowing, followingData]);
  //날 팔로우 한 유저들을 내가 팔로우 했는지 여부 판단

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  return (
    <Container>
      <FollowerInfo onClick={onClickFollowerUser}>
        <ProfileImage src={profileImage} width={40} />
        <FollowerName>{userName}</FollowerName>
      </FollowerInfo>
      <FollowingButton handleBtn={handleBtn} followOrNot={followOrNot} />
    </Container>
  );
};

export default FollowerList;

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
