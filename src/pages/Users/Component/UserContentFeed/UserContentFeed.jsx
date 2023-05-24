import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContentImage from '../ContentImage/ContentImage';

const UserContentFeed = ({ userId }) => {
  const [feed, setFeed] = useState([]);
  const feedGet = () => {
    const url = `http://10.58.52.125:6700/feeds/users/${userId}`;

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
    feedGet();
  }, []);

  return (
    <Container>
      <Posting>
        {(feed === undefined || feed.length === 0) && (
          <PostingNone>게시글이 없습니다</PostingNone>
        )}
        {feed !== undefined &&
          feed.length > 0 &&
          feed?.map(posting => {
            return (
              <ContentImage
                key={posting.feedId}
                image={posting.contentUrls[0].contentUrl}
                feedId={posting.feedId}
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

const PostingNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted orange;
  width: 100%;
  height: 200px;
  color: lightgray;
`;
