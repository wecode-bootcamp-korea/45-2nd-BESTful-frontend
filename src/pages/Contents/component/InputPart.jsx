import React, { useState } from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';

const InputPart = ({ feedId, getComments }) => {
  const [input, setInput] = useState('');

  // 댓글 추가 fetch
  const addComment = () => {
    fetch('http://10.58.52.108:3000/comment', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ contents: input, feedId: feedId }),
    })
      .then(res => res.json())
      .then(res => {
        getComments();
      });

    setInput('');
  };

  // 입력값 관리
  const handleInput = e => {
    setInput(e.target.value);
  };

  // 엔터 눌렀을때 실행 함수 (입력값이 있어야 fetch 요청)
  const handleEnter = e => {
    if (input && e.key === 'Enter') {
      addComment();
    }
  };

  // 입력 버튼 눌렀을때 실행 함수 (입력값이 있어야 fetch 요청)
  const handleButton = () => {
    if (input) {
      addComment();
    }
  };

  return (
    <Container>
      <input
        value={input}
        onChange={handleInput}
        onKeyUp={handleEnter}
        placeholder=" 칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
      />
      <button onClick={handleButton}>입력</button>
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
