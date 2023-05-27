import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import variables from '../../styles/variables';

const InvalidAccess = () => {
  const navigate = useNavigate();
  const warning = '/images/pages/Contents/warning.jpg';

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Container>
      <div className="invalid-box">
        <img alt="waring" src={warning} width="300" />
        <div className="error-msg">잘못된 접근입니다.</div>
        <button onClick={handleClick}>메인페이지</button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('column', 'center', 'center')}

  .invalid-box {
    ${variables.flex('column', 'center', 'center')};

    .error-msg {
      margin: 50px;
      font-size: 80px;
      font-weight: bold;
    }

    button {
      width: 20vw;
      height: 60px;
      background-color: black;
      font-weight: bold;
      font-size: 20px;
      color: white;
    }
  }
`;

export default InvalidAccess;
