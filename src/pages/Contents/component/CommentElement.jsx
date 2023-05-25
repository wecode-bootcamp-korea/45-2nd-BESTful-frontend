import React from 'react';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import styled from 'styled-components';

const CommentElement = () => {
  const src = '/images/components/profileImage/brunch.jpg';
  return (
    <Container>
      <ProfileImage src={src} width={30} />
      <CharPart>
        <div className="name">유저네임</div>
        <div className="content">
          멋지네요 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
        </div>

        <div className="delete">삭제</div>
      </CharPart>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 20px 0px;
`;

const CharPart = styled.div`
  margin-left: 20px;
  .name {
    font-weight: bold;
  }
  .content {
    margin: 10px 0px;
    line-height: 150%;
  }
  .delete {
    width: 30px;
    color: #828c94;
    font-size: 13px;
    cursor: pointer;
  }
`;

export default CommentElement;
