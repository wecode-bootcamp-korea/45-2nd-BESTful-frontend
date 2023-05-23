import React, { useState } from 'react';
import styled from 'styled-components';
import MyPageCategory from './Component/MyPageCategory/MyPageCategory';
import MyPageContent from './Component/MyPageContent/MyPageContent';

const Mypage = () => {
  const [category, setCategory] = useState(true);
  const [profileOrPosting, setProfileOrPosting] = useState(true);

  return (
    <Container>
      <MyPageCategory
        setCategory={setCategory}
        setProfileOrPosting={setProfileOrPosting}
      />
      <MyPageContent
        category={category}
        profileOrPosting={profileOrPosting}
        setProfileOrPosting={setProfileOrPosting}
      />
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
