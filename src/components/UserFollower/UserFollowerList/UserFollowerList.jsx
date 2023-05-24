import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../ProfileImage/ProfileImage';
import UserFollowerBtn from '../UserFollowerBtn/UserFollowerBtn';

const UserFollowerList = ({
  name,
  src,
  id,
  iFollowing,
  meId,
  follower,
  followingsFetch,
  userFollowerFetch,
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

  const onClickUserFollower = () => {
    navigate(`/users/${id}`);
  };

  const handleBtn = () => {
    followUser();
    setFollowOrNot(prev => !prev);
  };

  // TODO 1. 개별의 유저마다, 해당 유저를 내가 팔로우 하고 있는지에 대한 정보를 심기가 힘든 상황
  // TODO 2. 그렇기 때문에, 내가 팔로우하고 있는 모든 유저 list를 주는 api(follower/:userId)를 호출
  // TODO 3. 내가 판별하고 싶은 userId가 해당 list에 포함되어있는지로 팔로우 여부 확인
  // TODO 4. following 여부는 state로 관리할 필요 없이, 실제 데이터를 업데이트 하면서 분기처리하면 됨
  // TODO 5. unfollow, follow 통신이 성공적으로 진행될 때마다 이어서 2번의 api를 재호출하여 업데이트된 데이터 받아옴

  useEffect(() => {
    for (let j = 0; j < follower.length; j++) {
      if (follower[j].id === meId) {
        setNoButton(true);
      }
    }
  }, [follower]);

  useEffect(() => {
    for (let i = 0; i < iFollowing.length; i++) {
      if (iFollowing[i].id === id) {
        setFollowOrNot(true);
      }
    }
  }, [iFollowing]);

  useEffect(() => {
    userFollowerFetch();
  }, []);

  return (
    <Container>
      <FollowerInfo
        onClick={() => {
          onClickUserFollower();
          replacePage();
        }}
      >
        <ProfileImage src={src} width={40} />
        <FollowerName>{name}</FollowerName>
      </FollowerInfo>
      {noButton ? (
        ''
      ) : (
        <UserFollowerBtn
          handleBtn={handleBtn}
          id={id}
          followOrNot={followOrNot}
        />
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
