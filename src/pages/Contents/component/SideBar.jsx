import React, { useState, useEffect } from 'react';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';

const SideBar = () => {
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [heart]);

  const heartMode = {
    false: emptyHeart,
    true: fullHeart,
  };

  const handleHeart = () => {
    setHeart(prev => !prev);
  };

  return (
    <Container>
      <LikesButton onClick={handleHeart}>
        <HeartIcon icon={heartMode[heart]} size="2xl" isSelect={heart} />
      </LikesButton>
      <CommentButton>
        <FontAwesomeIcon icon={faComment} size="2xl" />
      </CommentButton>
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('column')}
  position:fixed;
  padding-top: 200px;

  button {
    margin: 10px 0px;
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

export default SideBar;
