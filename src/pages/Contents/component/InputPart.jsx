import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';

const InputPart = () => {
  return (
    <Container>
      <input placeholder=" 칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)" />
      <button>입력</button>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  ${variables.flex('row', 'center', 'center')}
  width: 100%;
  height: 45px;
  margin-left: 20px;
  border: 1px solid #c2c8cc;
  border-radius: 5px;

  input {
    flex-grow: 1;
    height: 100%;
    padding-left: 10px;
    border: none;
    border-radius: 5px;

    ::placeholder {
      color: #c2c8cc;
    }
    :focus {
      outline-color: ${theme.orange};
    }
  }

  button {
    height: 95%;
    position: absolute;
    right: 1px;
    border: none;
    border-radius: 5px;
    background-color: white;
    font-weight: bold;
    color: #c2c8cc;
    cursor: pointer;
  }
`;

export default InputPart;
