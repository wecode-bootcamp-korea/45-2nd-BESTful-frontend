import React from 'react';
import styled from 'styled-components';

const ProfileImage = ({ src, width }) => {
  return (
    <div className="profileImage">
      <Image alt="프로필 이미지" src={src} width={width} />
    </div>
  );
};

const Image = styled.img`
  border-radius: 50%;
`;

export default ProfileImage;
