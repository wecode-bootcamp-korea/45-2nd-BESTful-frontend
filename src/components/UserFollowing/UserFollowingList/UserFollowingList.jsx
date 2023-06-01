import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import UserFollowingBtn from '../UserFollowingBtn/UserFollowingBtn';

const UserFollowingList = ({
  name,
  src,
  id,
  iFollowing,
  followingsFetch,
  meId,
  follower,
  userFollowingFetch,
}) => {
  const [followOrNot, setFollowOrNot] = useState(false);
  const [noButton, setNoButton] = useState(false);

  const navigate = useNavigate();

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
    });
    followingsFetch();
  };

  const replacePage = () => {
    window.location.reload();
  };

  const onClickUserFollowing = () => {
    navigate(`/users/${id}`);
  };

  useEffect(() => {
    if (follower.id === meId) {
      setNoButton(true);
    }
  }, [follower]);

  useEffect(() => {
    for (let i = 0; i < iFollowing.length; i++) {
      if (iFollowing[i].id === id) {
        setFollowOrNot(true);
      }
    }
  }, [iFollowing, id]);

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  useEffect(() => {
    userFollowingFetch();
  }, []);

  return (
    <Container>
      <FollowerInfo
        onClick={() => {
          onClickUserFollowing();
          replacePage();
        }}
      >
        <ProfileImage src={src} width={40} />
        <FollowerName>{name}</FollowerName>
      </FollowerInfo>
      {noButton ? (
        ''
      ) : (
        <UserFollowingBtn
          handleBtn={handleBtn}
          id={id}
          followOrNot={followOrNot}
        />
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
