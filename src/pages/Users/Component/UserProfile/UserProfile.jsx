import React from 'react';
import styled from 'styled-components';

const UserProfile = ({ user }) => {
  return (
    <Container>
      <CameraBox>
        <ProfileImage src={`${user?.profileImageUrl}`} alt="프로필 이미지" />
      </CameraBox>
      <ProfileBox>
        <NickName>{user?.userName}</NickName>
        <ButtonBox>
          <FollowButton>
            <FollowNumber>100</FollowNumber>
            follower
          </FollowButton>
          <FollowButton>
            <FollowNumber>100</FollowNumber>
            following
          </FollowButton>
        </ButtonBox>
        <ChangeProfile>팔로잉</ChangeProfile>
        <Bio>{user?.bio}</Bio>
      </ProfileBox>
    </Container>
  );
};

export default UserProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30%;
  height: 600px;
`;

const CameraBox = styled.div``;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
`;

const NickName = styled.div`
  font-size: 21px;
  font-weight: bold;
`;

const ButtonBox = styled.div``;

const FollowButton = styled.button`
  padding: 30px 30px;
  border: none;
  background-color: transparent;
  font-size: 15px;
  color: ${props => props.theme.style.orange};

  &:hover {
    cursor: pointer;
  }
`;

const FollowNumber = styled.div`
  color: black;
  font-size: 21px;
`;

const ChangeProfile = styled.button`
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
  background-color: ${props => props.theme.style.orange};
  color: white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const Bio = styled.div`
  padding-top: 10%;
  width: 70%;
  font-size: 14px;
`;
