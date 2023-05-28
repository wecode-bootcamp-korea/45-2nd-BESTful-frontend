import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';

const SidePhoto = ({ data, onMoveImg }) => {
  return (
    <Container>
      {data &&
        data.map((img, index) => {
          return (
            <img
              key={index}
              alt="이미지"
              src={img.contentUrl}
              onClick={() => onMoveImg(index)}
            />
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('column', 'flex-start')}
  position:fixed;
  padding-top: 120px;

  img {
    width: 50px;
    height: 50px;
    margin: 5px 0px;
    border-radius: 5px;
    object-fit: cover;
    cursor: pointer;

    &:hover {
      outline: 1px solid ${theme.orange};
    }
  }
`;

export default SidePhoto;
