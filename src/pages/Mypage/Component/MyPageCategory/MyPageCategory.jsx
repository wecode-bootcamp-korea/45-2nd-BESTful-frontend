import React from 'react';
import styled from 'styled-components';

const MyPageCategory = ({ setCategory, setProfileOrPosting }) => {
  const handleCategory = e => {
    setCategory(e);
  };

  const handleProfileOrPosting = () => {
    setProfileOrPosting(true);
  };

  return (
    <Navigation>
      <UL>
        <List>
          <Button
            onClick={() => {
              handleCategory(true);
              handleProfileOrPosting();
            }}
          >
            게시글
          </Button>
        </List>
        <List>
          <Button
            onClick={() => {
              handleCategory(false);
              handleProfileOrPosting();
            }}
          >
            좋아요
          </Button>
        </List>
      </UL>
    </Navigation>
  );
};

const Navigation = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 15%;
  height: 70px;
`;

const UL = styled.ul`
  display: flex;
`;

const List = styled.li`
  margin-right: 10px;
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

export default MyPageCategory;
