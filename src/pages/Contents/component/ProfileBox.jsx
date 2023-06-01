import React from 'react';
import { useNavigate } from 'react-router';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import styled from 'styled-components';
import variables from '../../../styles/variables';

const ProfileBox = ({ src, userId, userName, createdAt }) => {
  const navigate = useNavigate();

  // 프로필 클릭시 users 페이지로 이동
  const handleProfile = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <Container>
      <User onClick={handleProfile}>
        <ProfileImage src={src} width={70} />
        <div className="bold">{userName}</div>
      </User>
      <div>{createdAt.slice(0, 10)}</div>
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('row', 'space-between', 'center')}
  padding: 30px 0px;

  div {
    font-size: 20px;
  }
`;

const User = styled.div`
  ${variables.flex('row', 'center', 'center')}
  cursor: pointer;

  .bold {
    margin-left: 20px;
    font-weight: bold;
  }
`;

export default ProfileBox;
