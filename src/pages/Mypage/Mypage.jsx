import React, { useState } from 'react';
import styled from 'styled-components';
import MyPageCategory from './Component/MyPageCategory/MyPageCategory';
import MyPageContent from './Component/MyPageContent/MyPageContent';
import { API_ADDRESS } from '../../utils/API_ADDRESS';

const Mypage = () => {
  const [myData, setMyData] = useState([]);
  const [myFollowerData, setMyFollowerData] = useState([]);
  const [myFollowingData, setMyFollowingData] = useState([]);
  const [feed, setFeed] = useState([]);
  const [like, setLike] = useState([]);
  const [category, setCategory] = useState(true);
  const [profileOrPosting, setProfileOrPosting] = useState(true);
  const [clickedFollow, setClickedFollow] = useState(false);
  const [loading, setLoading] = useState(true);

  // 내 정보 가져오기
  const myDataFetch = async () => {
    const url = `${API_ADDRESS}/users`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('resToken'),
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const json = await response.json();
      setMyData(json);
    } finally {
      setLoading(false);
    }
  };

  // 내 팔로워 가져오기
  const myFollowerFetch = () => {
    const url = `${API_ADDRESS}/follower/following/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
    })
      .then(res => res.json())
      .then(res => {
        setMyFollowerData(res);
      });
  };

  // 내가 팔로우 한 유저 가져오기
  const myFollowingFetch = () => {
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
        setMyFollowingData(res);
      });
  };

  // 내가 올린 피드 글 가져오기
  const feedGet = () => {
    const url = `${API_ADDRESS}/feeds/users/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(feed => {
        setFeed(feed);
      });
  };

  // 내가 좋아요 누른 글 가져오기
  const likeGet = () => {
    const url = `${API_ADDRESS}/feeds/likes/${myData.id}`;

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(like => {
        setLike(like);
      });
  };

  return (
    <Container>
      <MyPageCategory
        setCategory={setCategory}
        setProfileOrPosting={setProfileOrPosting}
        setClickedFollow={setClickedFollow}
        category={category}
        clickedFollow={clickedFollow}
      />
      <MyPageContent
        category={category}
        profileOrPosting={profileOrPosting}
        setProfileOrPosting={setProfileOrPosting}
        clickedFollow={clickedFollow}
        setClickedFollow={setClickedFollow}
      />
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
