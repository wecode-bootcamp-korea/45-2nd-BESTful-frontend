import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ContentImage = ({ image, feedId }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/contents/${feedId}`);
  };

  return (
    <Container>
      <Image src={image} alt="feedImage" onClick={handleNavigate} />
    </Container>
  );
};

export default ContentImage;

const Container = styled.div`
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;

  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`;

const Image = styled.img`
  border-radius: 5px;
  width: 200px;
  height: 300px;
  object-fit: cover;

  &:hover {
    transform: scale(1.1);
  }
`;
