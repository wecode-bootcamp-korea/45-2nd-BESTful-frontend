import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const LoginModal = ({ className, setShowModal, url }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const loginButtonRef = useRef();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('4c248878b8c10efecf8b6a9b415e2ccf');
    }

    window.Kakao.Auth.createLoginButton({
      container: '#kakaoLoginBtn',
      size: 'large',
      scope: 'profile_nickname, profile_image, account_email, gender',
      success: async function (authObj) {
        const accessToken = authObj.access_token;

        // 토큰을 백엔드에 전달
        try {
          const token = accessToken;

          const response = await axios.post(
            `http://13.125.231.183:3001/users/kakaologin`,
            {
              kakaoToken: token,
            }
          );

          const data = response.data;

          localStorage.setItem('resToken', data.token);
        } catch (error) {
          console.error(error);
        }
        setShowModal(false);
        if (location.pathname === url) {
          window.location.reload();
        } else {
          navigate(url);
        }

        window.Kakao.API.request({
          url: '/v2/user/me',
          fail: function (err) {
            alert(JSON.stringify(err));
          },
        });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  }, []);

  //카카오 계정 연결 끊기 + 로그아웃
  const handleUnlink = () => {
    if (!window.Kakao.Auth.getAccessToken()) {
      alert('로그인 후에 연결 끊기를 시도해주세요');
    } else {
      window.Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
          alert('카카오 연결 끊기 완료');
          window.Kakao.Auth.logout(() => {});
          localStorage.removeItem('resToken');
        },
        fail: function (error) {
          alert(JSON.stringify(error));
        },
      });
    }
  };

  const SnsLoginSignup = styled.div`
    font-size: 16px;
    color: white;
    text-align: center;
    margin-bottom: 24px;
  `;

  const KakaoLoginButton = styled.div`
    margin-bottom: 20px;
  `;

  const UnlinkButton = styled.button`
    color: white;
    border: none;
    background: none;
    cursor: pointer;
  `;
  return (
    <StyledContentContainer className={className}>
      <SnsLoginSignup>SNS계정으로 간편 로그인/회원가입</SnsLoginSignup>
      <KakaoLoginButton id="kakaoLoginBtn" ref={loginButtonRef} />
      <UnlinkButton onClick={handleUnlink}>
        카카오 연결을 끊고 싶으신가요?
      </UnlinkButton>
    </StyledContentContainer>
  );
};

export default LoginModal;

const StyledContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
