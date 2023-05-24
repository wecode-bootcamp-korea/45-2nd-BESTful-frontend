import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FeedImage from '../FeedImage/FeedImage';

const ContentPosting = ({ category, me }) => {
  const [feed, setFeed] = useState([]);
  const [like, setLike] = useState([]);
  const myId = me.id;

  const categoryMode = { true: feed, false: like };

  const feedGet = () => {
    const url = `http://10.58.52.125:6700/feeds/users/${myId}`;

    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
      .then(res => res.json())
      .then(feed => {
        setFeed(feed);
      });
  };

  const likeGet = () => {
    const url = `http://10.58.52.125:6700/feeds/likes/${myId}`;

    fetch(url, {
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
        {(categoryMode[category] === undefined ||
          categoryMode[category].length === 0) && (
          <PostingNone>
            {category
              ? '+ 첫 게시물을 올려보세요!'
              : '+ 게시물을 좋아요 해보세요!'}
          </PostingNone>
        )}
        {categoryMode[category] !== undefined &&
          categoryMode[category].length > 0 &&
          categoryMode[category].map(posting => {
            return (
              <FeedImage
                key={posting.feedId}
                image={posting.contentUrls[0].contentUrl}
                posting={posting}
                feedGet={feedGet}
                category={category}
                feedId={posting.feedId}
                myId={myId}
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

const PostingNone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dotted orange;
  width: 100%;
  height: 200px;
  color: lightgray;
`;
