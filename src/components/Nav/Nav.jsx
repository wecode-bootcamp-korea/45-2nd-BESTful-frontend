import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import NavProfileImage from './components/NavProfileImage';
import LoginModal from '../../pages/Login/components/LoginModal';

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [url, setUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const isPostUploadPage = location.pathname === '/post-upload';

  const token = localStorage.getItem('resToken');

  const loginModal = (e, id) => {
    if (!token) {
      e.preventDefault();
      setShowModal(true);
      if (id === 1) {
        setUrl('/following');
      } else if (id === 2) {
        setUrl('/post-upload');
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('resToken');
    navigate('/');
  };

  const goToLogin = () => {
    localStorage.removeItem('resToken');
    navigate('/login');
  };
  const goToHome = () => {
    navigate('/');
  };

  const goToMypage = () => {
    navigate('/mypage');
  };

  //ProfileImage 가져오기 위함
  useEffect(() => {
    if (!showModal) {
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
    }
  }, [showModal]);

  return (
    <Container>
      <NavWrapper>
        <div className="titleWrapper">
          <TitleWrap to="/">
            <Title onClick={goToHome} src="/images/logo/title.png" />
          </TitleWrap>
        </div>

        <BottomWrap>
          <BottomLeft>
            <Home
              onClick={goToHome}
              alt="homeIcon"
              src="/images/logo/hanger.png"
            />
            <Following to="/following" onClick={e => loginModal(e, 1)}>
              팔로잉
            </Following>
            <Best to="/best">베스트</Best>
          </BottomLeft>

          <BottomRight>
            <IsLogin onClick={goToLogin}>
              {token ? '로그아웃' : '로그인/회원가입'}
            </IsLogin>
            {token && (
              <NavProfileImage
                goToMypage={goToMypage}
                src={userInfo.profileImageUrl}
                width={40}
              />
            )}

            {!isPostUploadPage && (
              <Write to="/post-upload" onClick={e => loginModal(e, 2)}>
                글쓰기
              </Write>
            )}
          </BottomRight>
        </BottomWrap>
      </NavWrapper>
      {showModal && (
        <>
          <ModalBackground onClick={() => setShowModal(false)} />
          <StyledLoginContentContainer
            onClose={() => setShowModal(false)}
            setShowModal={setShowModal}
            url={url}
          />
        </>
      )}
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  color: black;
`;

const NavWrapper = styled.div`
  margin-bottom: 30px;
  width: 100%;
  border-bottom: 0.4px solid grey;
  .titleWrapper {
    ${props => props.theme.variables.flex('row', 'center', 'center')}
    padding: 16px;
  }
`;

const Title = styled.img`
  margin: 0;
  height: 32px;
  cursor: pointer;
`;

const TitleWrap = styled(Link)`
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
  color: black;
  :hover {
    color: #fe4600;
  }
`;

const Following = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: black;
  :hover {
    color: #fe4600;
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
    color: #fe4600;
  }
`;

const Write = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: black;
  :hover {
    color: #fe4600;
  }
`;

const StyledLoginContentContainer = styled(LoginModal)`
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
