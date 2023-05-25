import React from 'react';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import InputPart from './InputPart';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';
import CommentElement from './CommentElement';

const Comment = () => {
  const src = '/images/components/profileImage/brunch.jpg';
  return (
    <Container>
      <div className="num">
        댓글 <span>0</span>
      </div>
      <AddPart>
        <ProfileImage src={src} width={30} />
        <InputPart />
      </AddPart>
      <DisplayPart>
        <CommentElement />
        <CommentElement />
      </DisplayPart>
    </Container>
  );
};

const Container = styled.div`
  padding: 40px 0px;
  border-top: 1px solid #c2c8cc;
  border-bottom: 1px solid #c2c8cc;

  .num {
    font-size: 20px;
    font-weight: bold;
    span {
      color: ${theme.orange};
    }
  }
`;

const AddPart = styled.div`
  ${variables.flex('row', 'space-between', 'center')}
  margin: 30px 0px;
`;

const DisplayPart = styled.div``;

export default Comment;
