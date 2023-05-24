import React from 'react';
import styled from 'styled-components';

const MyPageCategory = ({
  setCategory,
  setProfileOrPosting,
  setClickedFollow,
  category,
  clickedFollow,
}) => {
  const handleCategory = handle => {
    setCategory(handle);
  };

  const handleProfileOrPosting = () => {
    setProfileOrPosting(true);
  };

  const handleFollowOrPosting = () => {
    setClickedFollow(false);
  };

  return (
    <Navigation>
      <UL>
        <List>
          <Button
            onClick={() => {
              handleCategory(true);
              handleProfileOrPosting();
              handleFollowOrPosting();
            }}
          >
            <PostingButton category={category} clickedFollow={clickedFollow}>
              게시글
            </PostingButton>
          </Button>
        </List>
        <List>
          <Button
            onClick={() => {
              handleCategory(false);
              handleProfileOrPosting();
              handleFollowOrPosting();
            }}
          >
            <LikeButton category={category} clickedFollow={clickedFollow}>
              좋아요
            </LikeButton>
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
  width: 70px;
  margin-right: 10px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  font-size: 15px;
  font-weight: bold;

  &:hover {
    border: 1px solid beige;
    outline: none;
    background-color: #ff5d2b12;
  }
`;

const PostingButton = styled.div`
  color: ${props =>
    props.clickedFollow === false &&
    (props.category ? props.theme.style.orange : 'black')};
`;

const LikeButton = styled.div`
  color: ${props =>
    props.clickedFollow === false &&
    (props.category ? 'black' : props.theme.style.orange)};
`;

export default MyPageCategory;
