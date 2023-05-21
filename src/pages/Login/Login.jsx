import React, { useEffect, useRef } from 'react';
import ContentContainer from './components/ContentContainer';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(3, 1fr);
  height: 100vh;
  width: 100%;
  background: #f24600;
  opacity: 0.85;
`;

const TopLeftImage = styled.div`
  grid-column: 1/ 2;
  grid-row: 1 / 3;
  background: linear-gradient(rgba(254, 70, 0, 0.5), rgba(254, 70, 0, 0.5)),
    url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbwTck0%2FbtsgTjXRY1U%2FqpNjvUUulIu1X68sYtfegk%2Fimg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  transition: opacity 0.5s ease-in-out;
`;

const TopRightImage = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  background: linear-gradient(rgba(254, 70, 0, 0.5), rgba(254, 70, 0, 0.5)),
    url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FuTuVE%2Fbtsg3WT5EXs%2Fi2KK5sCAFfsNHStlke5851%2Fimg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  transition: opacity 0.5s ease-in-out;
`;

const BottomLeftImage = styled.div`
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  background-image: linear-gradient(
      rgba(254, 70, 0, 0.5),
      rgba(254, 70, 0, 0.5)
    ),
    url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdfnDXN%2Fbtsg4iJx9xA%2FiYO6ruklOmIcSE2B0vutD1%2Fimg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;

const BottomRightImage = styled.div`
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  background-image: linear-gradient(
      rgba(254, 70, 0, 0.5),
      rgba(254, 70, 0, 0.5)
    ),
    url('https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FAA3pw%2FbtsgL9avmR4%2Fk1MHoaiOHKoVjJ58Nl10nk%2Fimg.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`;

const Login = () => {
  //image 요소에 참조하여 불규칙하게 opacity 주기 위함
  const imagesRef = useRef([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const images = imagesRef.current;
      const randomIndex = Math.floor(Math.random() * images.length);
      const image = images[randomIndex];
      image.style.opacity = Math.random().toFixed(2);

      setTimeout(() => {
        image.style.opacity = '0';
      }, 1100);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <LoginContainer>
      <TopLeftImage ref={el => (imagesRef.current[0] = el)} />
      <TopRightImage ref={el => (imagesRef.current[1] = el)} />
      <BottomRightImage ref={el => (imagesRef.current[2] = el)} />
      <BottomLeftImage ref={el => (imagesRef.current[3] = el)} />
      <ContentContainer />
    </LoginContainer>
  );
};

export default Login;
