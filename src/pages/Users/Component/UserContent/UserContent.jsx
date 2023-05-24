import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import UserProfile from '../UserProfile/UserProfile';
import UserContentFeed from '../UserContentFeed/UserContentFeed';

const UserContent = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const userId = params.id;

  const fetchResult = async () => {
    try {
      const response = await fetch(`http://10.58.52.204:3700/users/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('resToken'),
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const json = await response.json();
      setUser(json);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResult();
  }, [userId]);
  if (loading) return <div>로딩중...</div>;

  return (
    <Container>
      <UserProfile user={user} />
      <UserContentFeed />
    </Container>
  );
};

export default UserContent;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 70px;
`;
