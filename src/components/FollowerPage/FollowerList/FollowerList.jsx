import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import FollowerBtn from '../FollowerBtn/FollowerBtn';

const FollowerList = ({ name, src, id, followingData, followerFetch }) => {
  const [followOrNot, setFollowOrNot] = useState(false);

  const navigate = useNavigate();

  const onClickFollowerUser = () => {
    navigate(`/users/${id}`);
  };

  const followUser = () => {
    const url = `http://10.58.52.185:3000/follower`;

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
    followerFetch();
  };

  useEffect(() => {
    for (let i = 0; i < followingData.length; i++) {
      if (followingData[i].id === id) {
        setFollowOrNot(true);
      }
    }
  }, [followingData, id]);

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  useEffect(() => {
    followerFetch();
  }, []);

  return (
    <Container>
      <FollowerInfo onClick={onClickFollowerUser}>
        <ProfileImage src={src} width={40} />
        <FollowerName>{name}</FollowerName>
      </FollowerInfo>
      <FollowerBtn handleBtn={handleBtn} id={id} followOrNot={followOrNot} />
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

const FollowBtn = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 5px;
`;
