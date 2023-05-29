import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavProfileImage from './components/NavProfileImage';
import ContentContainer from '../../../src/pages/Login/components/ContentContainer';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const isPostUploadPage = location.pathname === '/post-upload';

  const token = localStorage.getItem('resToken');

  const loginModal = e => {
    if (!token) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const logout = () => {
    localStorage.removeItem('resToken');
    navigate('/');
  };

  const goToHome = () => {
    navigate('/');
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  //ProfileImage 가져오기 위함
  useEffect(() => {
    fetch('http://10.58.52.185:3000/users', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
      });
  }, []);

  return (
    <Container>
      <NavWrapper>
        <TitleWrap>
          <Title onClick={goToHome} src="/images/logo/title.png" />
        </TitleWrap>

        <BottomWrap>
          <BottomLeft>
            <Home
              onClick={goToHome}
              alt="homeIcon"
              src="/images/logo/hanger.png"
            />
            <Following to="/:userId/following" onClick={loginModal}>
              팔로잉
            </Following>
            <Best to="/best">베스트</Best>
          </BottomLeft>

          <BottomRight>
            <IsLogin onClick={token ? logout : loginModal}>
              {token ? '로그아웃' : '로그인'}
            </IsLogin>
            {token && (
              <NavProfileImage
                goToMypage={goToMypage}
                src={userInfo.profileImageUrl}
                width={40}
              />
            )}

            {!isPostUploadPage && (
              <Write to="/post-upload" onClick={loginModal}>
                글쓰기
              </Write>
            )}
          </BottomRight>
        </BottomWrap>
      </NavWrapper>
      {showModal && (
        <>
          <ModalBackground onClick={() => setShowModal(false)} />
          <StyledLoginContentContainer onClose={() => setShowModal(false)} />
        </>
      )}
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
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

const Title = styled.img`
  margin: 0;
  height: 32px;
  cursor: pointer;
`;

const TitleWrap = styled.div`
  font-size: 20px;
  font-family: 'MARU BuriOTF Beta';
  text-align: center;
  margin-bottom: 8px;
`;

const BottomWrap = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: 16px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid black;
`;

const BottomLeft = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 240px;
`;

const Home = styled.img`
  height: 24px;
  cursor: pointer;
`;

const Best = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  :hover {
    color: skyblue;
  }
`;

const Following = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  :hover {
    color: skyblue;
  }
`;

const BottomRight = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 300px;
`;

const IsLogin = styled.div`
  cursor: pointer;
  :hover {
    color: skyblue;
  }
`;

const Write = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  :hover {
    color: skyblue;
  }
`;

const StyledLoginContentContainer = styled(ContentContainer)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;
