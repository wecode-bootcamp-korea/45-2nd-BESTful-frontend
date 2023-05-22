import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeedImage from '../FeedImage/FeedImage';

const ContentPosting = ({ category }) => {
  const [feed, setFeed] = useState([]);
  const [like, setLike] = useState([]);

  const feedGet = () => {
    fetch('/data/feedImage.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(feed => {
        setFeed(feed);
      });
  };

  const likeGet = () => {
    fetch('/data/likeFeed.json', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(like => {
        setLike(like);
      });
  };

  useEffect(() => {
    feedGet();
    likeGet();
  }, []);

  return (
    <Container>
      <Posting>
        {(category ? feed : like)?.map(posting => {
          return (
            <FeedImage
              key={posting.id}
              image={posting.content_url}
              posting={posting}
              feedGet={feedGet}
              category={category}
            />
          );
        })}
      </Posting>
    </Container>
  );
};

export default ContentPosting;

const Container = styled.div`
  width: 65%;
`;

const Posting = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
