import React from 'react';
import styled from 'styled-components';

const NavProfileImage = ({ src, width, goToMypage }) => {
  return (
    <div className="profileImage" onClick={goToMypage}>
      <Image
        alt="프로필 이미지"
        src={src ? src : '/images/logo/noProfile.png'}
        wid={`${width}px`}
      />
    </div>
  );
};

const Image = styled.img`
  width: ${props => props.wid};
  height: ${props => props.wid};
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  :hover {
    border: skyblue 2px solid;
  }
`;

export default NavProfileImage;
