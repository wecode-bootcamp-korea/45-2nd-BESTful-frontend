import React, { useState, useEffect } from 'react';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';

const SideBar = ({ likes, onMoveComment, feedId }) => {
  const [heart, setHeart] = useState(false);
  const [likesCount, setLikesCount] = useState(parseInt(likes));

  const onMoveTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heartMode = {
    false: emptyHeart,
    true: fullHeart,
  };

  // 좋아요 클릭시 실행 함수
  const handleHeart = () => {
    fetch(`http://10.58.52.204:3700/likes/${feedId}`, {
      method: heart ? 'DELETE' : 'POST',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    setHeart(prev => !prev);
    setLikesCount(prev => prev + (heart ? -1 : +1));
  };

  //좋아요 불러오기
  useEffect(() => {
    fetch(`http://10.58.52.204:3700/likes/${feedId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        const { liked } = res;
        if (liked === true || liked === false) {
          setHeart(liked);
          return;
        }
      });
  }, []);

  return (
    <Container>
      <div className="heartWrapper" onClick={handleHeart}>
        <LikesButton>
          <HeartIcon icon={heartMode[heart]} size="2xl" isSelect={heart} />
        </LikesButton>
        <div>{likesCount}</div>
      </div>
      <CommentButton onClick={onMoveComment}>
        <FontAwesomeIcon icon={faComment} size="2xl" />
      </CommentButton>
      <TopButton onClick={onMoveTop}>
        <FontAwesomeIcon icon={faArrowUp} size="2xl" />
      </TopButton>
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('column')}
  position:fixed;
  padding-top: 200px;

  .heartWrapper {
    ${variables.flex('column', 'center', 'center')}
    margin-bottom: 10px;
    cursor: pointer;
  }

  button {
    margin: 7px 0px;
    width: 55px;
    height: 55px;
    background-color: white;
    border-radius: 50%;
    border: 1px solid #828c94;
  }
`;

const LikesButton = styled.button`
  cursor: pointer;
`;

const HeartIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.isSelect ? theme.orange : 'black')};
`;

const CommentButton = styled.button`
  cursor: pointer;
`;

const TopButton = styled.button`
  cursor: pointer;
`;

export default SideBar;
