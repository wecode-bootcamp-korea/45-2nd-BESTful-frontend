import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentImage from '../ContentImage/ContentImage';

const UserContentFeed = () => {
  const [feed, setFeed] = useState([]);

  const feedGet = () => {
    fetch('/data/userFeed.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(feed => {
        setFeed(feed);
      });
  };

  useEffect(() => {
    feedGet();
  }, []);

  return (
    <Container>
      <Posting>
        {feed?.map(posting => {
          return (
            <ContentImage
              key={posting.feedId}
              image={posting.contentUrls[0].contentUrl}
            />
          );
        })}
      </Posting>
    </Container>
  );
};

export default UserContentFeed;

const Container = styled.div`
  width: 65%;
`;

const Posting = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
