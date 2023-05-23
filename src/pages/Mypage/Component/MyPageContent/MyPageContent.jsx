import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentProfile from '../ContentProfile/ContentProfile';
import ContentPosting from '../ContentPosting/ContentPosting';
import ProfileModify from '../ProfileModify/ProfileModify';
const MyPageContent = ({ category, profileOrPosting, setProfileOrPosting }) => {
  const [me, setMe] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResult = async () => {
    try {
      const response = await fetch('/data/user.json', {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const json = await response.json();
      setMe(json);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);
  if (loading) return <div>로딩중...</div>;

  return (
    <Container>
      <ContentProfile
        profile={me[0]}
        setProfileOrPosting={setProfileOrPosting}
      />
      {profileOrPosting ? (
        <ContentPosting category={category} />
      ) : (
        <ProfileModify profile={me[0]} setMe={setMe} />
      )}
    </Container>
  );
};

export default MyPageContent;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
