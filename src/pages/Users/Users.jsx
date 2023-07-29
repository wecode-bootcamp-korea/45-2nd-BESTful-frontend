import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API_ADDRESS } from '../../utils/API_ADDRESS';
import UserContentFeed from './Component/UserContentFeed/UserContentFeed';
import UserFollower from '../../components/UserFollower/UserFollower';
import UserFollowing from '../../components/UserFollowing/UserFollowing';
import UserProfile from './Component/UserProfile/UserProfile';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [myData, setMyData] = useState([]);
  const [myFollowingUser, setMyFollowingUser] = useState([]);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCategory, setUserCategory] = useState(0);

  const params = useParams();
  const userId = params.id;

  const navigate = useNavigate();

  const myId = myData.id;

  // 유저 데이터 받아오기
  const userDataFetch = async () => {
    const url = `${API_ADDRESS}/users/${userId}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('resToken'),
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const json = await response.json();
      setUserData(json);
    } finally {
      setLoading(false);
    }
  };

  // 팔로워 데이터 받아오기
  const userFollowerFetch = () => {
    const url = `${API_ADDRESS}/follower/following/${userId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setUserFollower(res);
      });
  };

  // 팔로잉 데이터 받아오기
  const userFollowingFetch = () => {
    const url = `${API_ADDRESS}/follower/${userId}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setUserFollowing(res);
      });
  };

  // 내 정보 가져오기
  const myDataFetch = () => {
    fetch(`${API_ADDRESS}/users`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        setMyData(res);
      });
  };

  // 내가 팔로우하는 유저들 정보 가져오기
  const myFollowingUserFetch = () => {
    const url = `${API_ADDRESS}/follower/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setMyFollowingUser(res);
      });
  };

  const feedGet = () => {
    const url = `${API_ADDRESS}/feeds/users/${userId}`;

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(feed => {
        setFeed(feed);
      });
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
    0: <UserContentFeed userId={userData.id} feed={feed} />,
    1: (
      <UserFollower
        userFollower={userFollower}
        myId={myId}
        iFollowing={myFollowingUser}
        setUserCategory={setUserCategory}
        myFollowingUserFetch={myFollowingUserFetch}
      />
    ),
    2: (
      <UserFollowing
        userFollowing={userFollowing}
        myData={myData}
        myFollowingUser={myFollowingUser}
        // followingsFetch={followingsFetch}
        // userFollowingFetch={userFollowingFetch}
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
        setUserCategory={setUserCategory}
        myFollowingUserFetch={myFollowingUserFetch}
      />
      {categoryList[userCategory]}
    </Container>
  );
};

export default Users;

const Container = styled.div`
  display: flex;
  justify-content: ${props =>
    props.userCategory === 0 ? 'space-between' : 'center'};
  padding-top: 70px;
  background-color: yellow;
`;
