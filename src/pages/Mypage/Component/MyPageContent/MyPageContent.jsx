import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentProfile from '../ContentProfile/ContentProfile';
import ContentPosting from '../ContentPosting/ContentPosting';
import ProfileModify from '../ProfileModify/ProfileModify';
import FollowerPage from '../../../../components/FollowerPage/FollowerPage';
import FollowingPage from '../../../../components/FollowingPage/FollowingPage';

const MyPageContent = ({
  category,
  profileOrPosting,
  setProfileOrPosting,
  clickedFollow,
  setClickedFollow,
}) => {
  const [me, setMe] = useState([]);
  // 내 데이터
  const [loading, setLoading] = useState(true);
  const [followerFollowing, setFollowerFollowing] = useState(true);
  // followerFollowing이 true이면 팔로워 false이면 팔로잉
  const [followerData, setFollowerData] = useState([]);
  // 팔로워 데이터
  const [followingData, setFollowingData] = useState([]);
  // 팔로잉 데이터
  // // 팔로우 팔로잉 버튼 true이면 팔로우 false이면 팔로잉

  const meMeId = me.id;

  const fetchResult = async () => {
    const url = `http://10.58.52.185:3000/users/`;

    try {
      const response = await fetch('http://10.58.52.185:3000/users', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('resToken'),
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const json = await response.json();
      setMe(json);
    } finally {
      setLoading(false);
    }
  };

  // 로그인 한 유저(나) 정보 받기

  const followerFetch = () => {
    const url = `http://10.58.52.185:3000/follower/following/${meMeId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setFollowerData(res);
      });
  };

  // 팔로워 정보 받기

  const followingFetch = () => {
    const url = `http://10.58.52.185:3000/follower/${meMeId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setFollowingData(res);
      });
  };

  // 팔로잉 유저 정보 받기

  useEffect(() => {
    fetchResult();
  }, []);

  useEffect(() => {
    if (!meMeId) return;

    followerFetch();
    followingFetch();
  }, [meMeId]);

  if (loading) return <div>로딩중...</div>;

  return (
    <Container>
      <ContentProfile
        profile={me}
        setProfileOrPosting={setProfileOrPosting}
        setClickedFollow={setClickedFollow}
        setFollowerFollowing={setFollowerFollowing}
        followerData={followerData}
        followingData={followingData}
        fetchResult={fetchResult}
      />
      {clickedFollow ? (
        followerFollowing ? (
          <FollowerPage
            followerData={followerData}
            me={me}
            followingData={followingData}
          />
        ) : (
          <FollowingPage followingData={followingData} me={me} />
        )
      ) : profileOrPosting ? (
        <ContentPosting category={category} me={me} />
      ) : (
        <ProfileModify profile={me} setMe={setMe} />
      )}
    </Container>
  );
};

export default MyPageContent;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
