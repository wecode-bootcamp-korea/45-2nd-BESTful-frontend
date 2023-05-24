import React from 'react';
import styled from 'styled-components';

const UsersAll = () => {
  return (
    <Navigation>
      <Button>게시글 보기</Button>
    </Navigation>
  );
};

export default UsersAll;

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20%;
  height: 70px;
  /* background-color: green; */
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: bold;

  &:hover {
    border-bottom: 1px solid gray;
    cursor: pointer;
    color: ${props => props.theme.style.orange};
  }
`;
