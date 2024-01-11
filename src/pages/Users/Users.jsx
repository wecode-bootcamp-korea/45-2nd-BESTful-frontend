import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserContentFeed from './Component/UserContentFeed/UserContentFeed';
import UserFollower from '../../components/UserFollower/UserFollower';
import UserProfile from './Component/UserProfile/UserProfile';
import fetchApi from '../../utils/functions';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [myData, setMyData] = useState([]);
  const [myFollowingUser, setMyFollowingUser] = useState([]);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCategory, setUserCategory] = useState(0);
  const [followerOrFollowing, setFollowerOrFollowing] = useState(undefined);

  const params = useParams();
  const userId = params.id;

  const navigate = useNavigate();

  const myId = myData.id;

  // 유저 데이터 받아오기
  const userDataFetch = async () => {
    try {
      const response = await fetchApi(`/users/${userId}`);
      const result = await response.json();

      setUserData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 팔로워 데이터 받아오기
  const userFollowerFetch = async () => {
    try {
      const response = await fetchApi(`/follower/following/${userId}`);
      const result = await response.json();

      setUserFollower(result);
    } catch (error) {
      console.log(error);
    }
  };

  // 팔로잉 데이터 받아오기
  const userFollowingFetch = async () => {
    try {
      const response = await fetchApi(`/follower/${userId}`);
      const result = await response.json();

      setUserFollowing(result);
    } catch (error) {
      console.log(error);
    }
  };

  // 내 정보 가져오기
  const myDataFetch = async () => {
    try {
      const response = await fetchApi(`/users`);
      const result = await response.json();

      setMyData(result);
    } catch (error) {
      console.log(error);
    }
  };

  // 내가 팔로우하는 유저들 정보 가져오기
  const myFollowingUserFetch = async () => {
    try {
      const response = await fetchApi(`/follower/${myData.id}`);
      const result = await response.json();

      setMyFollowingUser(result);
    } catch (error) {
      console.log(error);
    }
  };

  // 유저 피드 정보 가져오기
  const feedGet = async () => {
    try {
      const response = await fetchApi(`/feeds/users/${userId}`);
      const result = await response.json();

      setFeed(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userDataFetch();
    userFollowerFetch();
    userFollowingFetch();
    feedGet();
    setUserCategory(0);
  }, [userId]);

  useEffect(() => {
    myDataFetch();
    myFollowingUserFetch();
    if (parseInt(userId) === parseInt(myData.id)) {
      navigate('/mypage');
    }
  }, [userId]);

  const categoryList = {
    0: <UserContentFeed feed={feed} />,
    1: (
      <UserFollower
        userFollower={followerOrFollowing ? userFollower : userFollowing}
        myId={myId}
        iFollowing={myFollowingUser}
        setUserCategory={setUserCategory}
        myFollowingUserFetch={myFollowingUserFetch}
        followerOrFollowing={followerOrFollowing}
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
        myFollowingUserFetch={myFollowingUserFetch}
        setFollowerOrFollowing={setFollowerOrFollowing}
        setUserCategory={setUserCategory}
      />
      {categoryList[userCategory]}
    </Container>
  );
};

export default Users;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 70px;
`;
