import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContent from './Component/UserContent/UserContent';
import { API_ADDRESS } from '../../utils/API_ADDRESS';

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [userFollower, setUserFollower] = useState([]);
  const [userFollowing, setUserFollowing] = useState([]);
  const [myData, setMyData] = useState([]);
  const [myFollowingUser, setMyFollowingUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();
  const userId = params.id;

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

  useEffect(() => {
    userDataFetch();
    userFollowerFetch();
    userFollowingFetch();
    // myDataFetch();
    // myFollowingUserFetch();
  }, []);

  useEffect(() => {
    myDataFetch();
    myFollowingUserFetch();
    if (parseInt(userId) === parseInt(myData.id)) {
      navigate('/mypage');
    }
  }, [myData.id]);

  return (
    <UserContent
      userData={userData}
      userFollower={userFollower}
      userFollowing={userFollowing}
      myData={myData}
      myFollowingUser={myFollowingUser}
      userId={userId}
      loading={loading}
    />
  );
};

export default Users;
