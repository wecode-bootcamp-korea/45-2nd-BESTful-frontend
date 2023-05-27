import React from 'react';
import styled from 'styled-components';

const Nav = () => {
  return (
    <Container>
      <NavWrapper>
        <TitleWrap>
          <Title>오늘뭐입지</Title>
        </TitleWrap>

        <BottomWrap>
          <BottomLeft>
            <Home alt="homeIcon" src="/images/logo/hanger.png" />
            <Following>팔로잉</Following>
            <Best>베스트</Best>
          </BottomLeft>

          <BottomRight>
            <ProfileButton alt="profileIcon" src="" />
            <Write>글쓰기</Write>
          </BottomRight>
        </BottomWrap>
      </NavWrapper>
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  color: black;
`;

const NavWrapper = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  height: 98px;
  border-bottom: 0.4px solid grey;
`;

const Title = styled.p`
  margin: 0;
  cursor: pointer;
`;

const TitleWrap = styled.div`
  font-size: 20px;
  font-family: 'MARU BuriOTF Beta';
  text-align: center;
  margin-bottom: 16px;
`;

const BottomWrap = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid black;
  padding-top: 16px;
  align-items: center;
`;

const BottomLeft = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 240px;
`;

const Home = styled.img`
  height: 24px;
  cursor: pointer;
`;

const Best = styled.div`
  cursor: pointer;
`;

const Following = styled.div`
  cursor: pointer;
`;

const BottomRight = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 200px;
`;

const Write = styled.div`
  cursor: pointer;
`;

const ProfileButton = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  object-fit: cover;
  cursor: pointer;
  background-color: red;
`;
