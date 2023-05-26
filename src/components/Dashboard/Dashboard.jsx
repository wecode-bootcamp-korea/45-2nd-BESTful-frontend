import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '../ProfileImage/ProfileImage';
import ArticleContent from './subComponent/ArticleContent';
import Carousel from './subComponent/Carousel';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import variables from '../../styles/variables';
import theme from '../../styles/theme';

const Dashboard = ({ data, scale = 1 }) => {
  const navigate = useNavigate();

  const [following, setFollowing] = useState(true); //팔로잉/팔로우
  const [heart, setHeart] = useState(false); //좋아요

  //좋아요 유무에 따라 아이콘 변경
  const heartMode = {
    false: emptyHeart,
    true: fullHeart,
  };

  //좋아요 버튼 클릭 함수
  const handleHeart = () => {
    // fetch('http://10.58.52.204:3700/like', {
    //   method: following ? 'DELETE' : 'POST',
    //   headers: {
    //     Authorization: localStorage.getItem('resToken'),
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res));

    setHeart(prev => !prev);
  };

  // 상단의 유저프로필 클릭 함수 (아직 백엔드에서 값 안줘서 지정X)
  const handleUser = () => {
    // navigate(`/users/${data.userId}`);
    console.log('클릭시 해당 Users 페이지 이동');
  };

  const handleImageClick = imgIdx => {
    navigate(`/contents/${data.feedId}`, { state: { image: imgIdx } });
    console.log('이미지 클릭', imgIdx);
  };

  //댓글 버튼 클릭시 함수 (해당 피드상세페이지로 이동)
  const handleComment = () => {
    navigate(`/contents/${data.feedId}`);
  };

  // //피드 좋아요 유/무 설정
  // useEffect(() => {
  //   fetch('http://10.58.52.204:3700/like', {
  //     method: 'GET',
  //     headers: {
  //       Authorization: localStorage.getItem('resToken'),
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(
  //       res => console.log(res)
  //       // setHeart(res)
  //     );
  // }, []);

  return (
    <div className="dashboard">
      <Container scale={scale}>
        <Head>
          <div className="headLeft">
            <div className="user" onClick={handleUser}>
              <ProfileImage src={data.profileImageUrl} width={30} />
              <div className="bold">{data.userName}</div>
            </div>
          </div>
          <div className="time">{data.createdAt}</div>
        </Head>

        <ImageLabel>
          <Carousel
            imageList={data.contentUrls}
            handleImageClick={handleImageClick}
          />
        </ImageLabel>

        <ArticleContent content={data.feedDescription} length={120} />
        <Tail>
          <div className="heartPart" onClick={handleHeart}>
            <HeartIcon icon={heartMode[heart]} size="2x" isSelect={heart} />
            <div className="heartCount">{data.likesCount}</div>
          </div>
          <div>
            <CommentIcon icon={faComment} size="2x" onClick={handleComment} />
          </div>
        </Tail>
      </Container>
    </div>
  );
};

const Container = styled.div`
  width: 552px;
  margin-left: 100px;
  border: 1px solid #a4acb3;
  background-color: white;
  transform: scale(${props => props.scale});
`;

const Head = styled.div`
  ${variables.flex('row', 'space-between')};
  height: 60px;
  padding: 15px 16px;

  .headLeft {
    ${variables.flex('row', 'none')};
    margin-right: 10px;

    .user {
      ${variables.flex('row', 'center', 'center')}
      cursor: pointer;

      .bold {
        margin: 0px 10px;
        font-weight: bold;
      }
    }
  }

  .time {
    color: #828c94;
    font-size: 13px;
  }
`;

const ImageLabel = styled.div`
  position: relative;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const Tail = styled.div`
  ${variables.flex('row', 'space-around', 'center')};
  padding: 16px;

  .heartPart {
    ${variables.flex('row')};
    cursor: pointer;

    .heartCount {
      margin-left: 10px;
    }
  }
`;

const HeartIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.isSelect ? theme.orange : 'black')};
  div {
    cursor: pointer;
  }
`;

const CommentIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

export default Dashboard;
