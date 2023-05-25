import React from 'react';
import useFetch from '../../hooks/useFetch';
import styled from 'styled-components';
import FollowElement from './subComponent/FollowElement';

const FollowDisplay = ({ EleWidth }) => {
  const { loading, data, error } = useFetch(
    [],
    '/data/followDisplayData.json',
    {
      method: 'GET',
    }
  );

  if (error) return alert(error);
  if (loading) return null;

  return (
    <Container>
      <Title>팔로잉</Title>
      <FollowList>
        {data.map(user => (
          <FollowElement key={user.id} name={user.userName} width={EleWidth} />
        ))}
      </FollowList>
    </Container>
  );
};

const Container = styled.div`
  padding: 60px;
`;

const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
  font-size: 18px;
`;

const FollowList = styled.div``;

export default FollowDisplay;
