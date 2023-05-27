import React from 'react';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import styled from 'styled-components';

const CommentElement = ({ comment, feedId, getComments }) => {
  // 댓글 시간 계산
  const time = computeTime(comment.createdAt);

  // 댓글 삭제하기 버튼 (fetch)
  const handleDelete = () => {
    fetch('http://10.58.52.108:3000/comment', {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ commentId: comment.id, feedId: feedId }),
    })
      .then(res => res.json())
      .then(res => {
        getComments();
      });
  };

  return (
    <Container>
      <ProfileImage src={comment.profileImageUrl} width={30} />
      <CharPart>
        <div className="name">{comment.userName}</div>
        <div className="content">{comment.contents}</div>

        <Under>
          <div>{time}</div>
          <div>·</div>
          <div className="delete" onClick={handleDelete}>
            삭제
          </div>
        </Under>
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
`;

const Under = styled.div`
  display: flex;
  div {
    margin-right: 5px;
    color: #828c94;
    font-size: 13px;
    &.delete {
      cursor: pointer;
    }
  }
`;

export default CommentElement;

const computeTime = createdAt => {
  const [y, m, d, th, tm] = createdAt.split('.');

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate() + 1;
  const hour = now.getHours();
  const minutes = now.getMinutes();

  if (year > parseInt(y)) {
    return createdAt.slice(0, 10);
  } else if (month > parseInt(m)) {
    return `${month - parseInt(m)}개월전`;
  } else if (day > parseInt(d)) {
    return `${day - parseInt(d)}일전`;
  } else if (hour > parseInt(th)) {
    return `${hour - th}시간전`;
  } else return `${minutes - tm}분전`;
};
