import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserProfile from '../UserProfile/UserProfile';
import UserContentFeed from '../UserContentFeed/UserContentFeed';
import UserFollower from '../../../../components/UserFollower/UserFollower';
import UserFollowing from '../../../../components/UserFollowing/UserFollowing';
import { API_ADDRESS } from '../../../../utils/API_ADDRESS';

const UserContent = ({
  userData,
  userFollower,
  userFollowing,
  myData,
  myFollowingUser,
  userId,
  loading,
  myFollowingUserFetch,
}) => {
  // const [user, setUser] = useState([]);
  const [isUserFollow, setIsUserFollow] = useState(false);
  const [isAll, setIsAll] = useState(true);
  // isUserFollow가 true면 follower, false면 following
  // const [userFollower, setUserFollower] = useState([]);
  // const [userFollowing, setUserFollowing] = useState([]);
  // const [myData, setMyData] = useState([]);
  // const [iFollowing, setIFollowing] = useState([]);
  const [userCategory, setUserCategory] = useState(0);
  // const params = useParams();

  const categoryList = {
    0: <UserContentFeed userId={userId} />,
    1: (
      <UserFollower
        userFollower={userFollower}
        myData={myData}
        iFollowing={myFollowingUser}
        // followingsFetch={followingsFetch}
        // userFollowerFetch={userFollowerFetch}
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

  // const userId = params.id;
  // const navigate = useNavigate();

  // const userDataFetch = async () => {
  //   const url = `${API_ADDRESS}/users/${userId}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: 'GET',
  //       headers: {
  //         Authorization: localStorage.getItem('resToken'),
  //         'Content-Type': 'application/json;charset=utf-8',
  //       },
  //     });
  //     const json = await response.json();
  //     setUser(json);
  //   } finally {
  //     // setLoading(false);
  //   }
  // };
  // 유저 데이터 받아오기

  // const userFollowerFetch = () => {
  //   const url = `${API_ADDRESS}/follower/following/${userId}`;

  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       Authorization: localStorage.getItem('resToken'),
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setUserFollower(res);
  //     });
  // };
  // 팔로워 데이터 받아오기

  // const userFollowingFetch = () => {
  //   const url = `${API_ADDRESS}/follower/${userId}`;

  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       Authorization: localStorage.getItem('resToken'),
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setUserFollowing(res);
  //     });
  // };
  // 팔로잉 데이터 받아오기

  // const meFetch = () => {
  //   fetch(`${API_ADDRESS}/users`, {
  //     method: 'GET',
  //     headers: {
  //       Authorization: localStorage.getItem('resToken'),
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setMyData(res);
  //     });
  // };
  // 내 정보 가져오기

  // const followingsFetch = () => {
  //   const url = `${API_ADDRESS}/follower/${myData.id}`;

  //   fetch(url, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       Authorization: localStorage.getItem('resToken'),
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       setIFollowing(res);
  //     });
  // };
  // 내가 팔로우하는 유저들 정보 가져오기

  // useEffect(() => {
  //   // userDataFetch();
  //   // userFollowerFetch();
  //   userFollowingFetch();
  // }, [userId, isAll]);

  // useEffect(() => {
  //   meFetch();
  //   followingsFetch();
  //   if (parseInt(userId) === parseInt(myData.id)) {
  //     navigate('/mypage');
  //   }
  // }, [myData.id]);

  if (loading) return <div>로딩중...</div>;

  return (
    <Container isAll={isAll}>
      <UserProfile
        user={userData}
        setIsAll={setIsAll}
        setIsUserFollow={setIsUserFollow}
        myData={myData}
        userFollower={userFollower}
        userFollowing={userFollowing}
        iFollowing={myFollowingUser}
        setUserCategory={setUserCategory}
        myFollowingUserFetch={myFollowingUserFetch}
        // followingsFetch={followingsFetch}
      />
      {categoryList[userCategory]}
    </Container>
  );
};

export default UserContent;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  /* justify-content: ${props => (props.isAll ? 'space-between' : 'center')}; */
  padding-top: 70px;
  background-color: yellow;
`;
