import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import ProfileImage from '../../../components/ProfileImage/ProfileImage';
import styled from 'styled-components';
import { API_ADDRESS } from '../../../utils/API_ADDRESS';

const CommentElement = ({ comment, feedId, getComments }) => {
  // 댓글 시간 계산
  const time = computeTime(comment.createdAt);

  // 댓글 삭제하기 버튼 (fetch)
  const handleDelete = () => {
    fetch(`${API_ADDRESS}/comment`, {
      method: 'PATCH',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ commentId: comment.commentsId, feedId: feedId }),
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
        <div className="content">{comment.commentContents}</div>

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
  dayjs.extend(utc);

  const [y, m, d, th, tm] = createdAt.split('.');
  const upload = dayjs(`${y}-${m}-${d}T${th}:${tm}:00Z`);

  const now = dayjs().utc();

  if (now.diff(upload, 'year')) {
    return createdAt.slice(0, 10);
  } else if (now.diff(upload, 'month')) {
    return `${now.diff(upload, 'month')}개월전`;
  } else if (now.diff(upload, 'day')) {
    return `${now.diff(upload, 'day')}일전`;
  } else if (now.diff(upload, 'hour')) {
    return `${now.diff(upload, 'hour')}시간전`;
  } else return `${now.diff(upload, 'minute')}분전`;
};
