import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import FollowingBtn from '../FollowingBtn/FollowingBtn';
import { API_ADDRESS } from '../../../utils/API_ADDRESS';

const FollowingList = ({ name, src, id, followingFetch }) => {
  const [followOrNot, setFollowOrNot] = useState(true);

  const navigate = useNavigate();

  const onClickFollowingUser = () => {
    navigate(`/users/${id}`);
  };

  useEffect(() => {
    followingFetch();
  }, []);

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
    // followingFetch();
  };

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  return (
    <Container>
      <FollowerInfo onClick={onClickFollowingUser}>
        <ProfileImage src={src} width={40} />
        <FollowerName>{name}</FollowerName>
      </FollowerInfo>
      <FollowingBtn handleBtn={handleBtn} id={id} followOrNot={followOrNot} />
    </Container>
  );
};

export default FollowingList;

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
