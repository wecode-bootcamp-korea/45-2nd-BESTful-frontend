import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ContentImage = ({ image }) => {
  return (
    <Container>
      <Image src={image} alt="feedImage" />
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

  &:hover {
    transform: scale(1.1);
  }
`;
