import React, { useEffect, useState } from 'react';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import InputPart from './InputPart';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';
import CommentElement from './CommentElement';

const Comment = ({ feedId, commentRef }) => {
  const [comments, setComments] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  // 댓글 불러오기 fetch
  const getComments = () => {
    fetch(`http://10.58.52.185:3000/feeds/${feedId}/comment`)
      .then(res => res.json())
      .then(res => {
        setComments(res);
      });
  };

  // 현재 유저 정보 불러오기
  useEffect(() => {
    fetch('http://10.58.52.185:3000/users', {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        setUserInfo(res);
      });
  }, []);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <Container ref={commentRef}>
      <div className="num">
        댓글 <span>{comments.length}</span>
      </div>
      <AddPart>
        <ProfileImage src={userInfo.profileImageUrl} width={30} />
        <InputPart feedId={feedId} getComments={getComments} />
      </AddPart>
      <DisplayPart>
        {comments &&
          comments.map(comment => (
            <CommentElement
              key={comment.commentsId}
              feedId={feedId}
              comment={comment}
              getComments={getComments}
            />
          ))}
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
