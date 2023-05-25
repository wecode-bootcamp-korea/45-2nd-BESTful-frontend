import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';

const SidePhoto = ({ data }) => {
  return (
    <Container>
      {data.map(img => {
        return <img key={img.id} alt="이미지" src={img.src} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('column', 'flex-start')}
  position:fixed;
  padding-top: 200px;

  img {
    width: 50px;
    height: 50px;
    margin: 5px 0px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

export default SidePhoto;
