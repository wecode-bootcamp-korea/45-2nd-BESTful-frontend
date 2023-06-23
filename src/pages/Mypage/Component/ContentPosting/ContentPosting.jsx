import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import FeedImage from '../FeedImage/FeedImage';
import { useNavigate } from 'react-router-dom';
import { API_ADDRESS } from '../../../../utils/API_ADDRESS';

const ContentPosting = ({ category, me }) => {
  const [feed, setFeed] = useState([]);
  const [like, setLike] = useState([]);
  const myId = me.id;

  const navigate = useNavigate();

  const categoryMode = { true: feed, false: like };

  const feedGet = () => {
    const url = `${API_ADDRESS}/feeds/users/${myId}`;

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
    const url = `${API_ADDRESS}/feeds/likes/${myId}`;

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
            {category ? (
              <span
                className="firstPost"
                onClick={() => navigate('/post-upload')}
              >
                + 첫 게시물을 올려보세요!
              </span>
            ) : (
              '+ 게시물을 좋아요 해보세요!'
            )}
          </PostingNone>
        )}
        {categoryMode[category] !== undefined &&
          categoryMode[category].length > 0 &&
          categoryMode[category].map(posting => {
            // contentsUrl의 min id 값의 index 반환
            let minId = posting.contentUrls[0].id;
            let minIndex = 0;
            for (let i = 0; i < posting.contentUrls.length; i++) {
              if (minId > posting.contentUrls[i].id) {
                minId = posting.contentUrls[i].id;
                minIndex = i;
              }
            }
            return (
              <FeedImage
                key={posting.feedId}
                image={posting.contentUrls[minIndex].contentUrl}
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
  .firstPost {
    cursor: pointer;
  }
`;
