import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProfileImage from '../ProfileImage/ProfileImage';
import ArticleContent from './subComponent/ArticleContent';
import Carousel from './subComponent/Carousel';
import LoginModal from '../../pages/Login/components/LoginModal';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import variables from '../../styles/variables';
import theme from '../../styles/theme';
import { API_ADDRESS } from '../../utils/API_ADDRESS';

const Dashboard = ({ data, scale = 1, searchParams }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [url, setUrl] = useState('');
  const [heart, setHeart] = useState(false); //좋아요
  const [likesCount, setLikesCount] = useState(parseInt(data?.likesCount));
  const [showModal, setShowModal] = useState(false);
  //좋아요 유무에 따라 아이콘 변경
  const heartMode = {
    false: emptyHeart,
    true: fullHeart,
  };

  //좋아요 버튼 클릭 함수
  const handleHeart = e => {
    if (!localStorage.getItem('resToken')) {
      e.preventDefault();
      setShowModal(true);
      setUrl(location.pathname);
      return;
    }
    fetch(`${API_ADDRESS}/likes/${data.feedId}`, {
      method: heart ? 'DELETE' : 'POST',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    setHeart(prev => !prev);
    setLikesCount(prev => prev + (heart ? -1 : +1));
  };

  // 상단의 유저프로필 클릭 함수 (아직 백엔드에서 값 안줘서 지정X)
  const handleUser = () => {
    navigate(`/users/${data.userId}`);
  };

  const handleImageClick = imgIdx => {
    navigate(`/contents/${data.feedId}`);
  };

  //댓글 버튼 클릭시 함수 (해당 피드상세페이지로 이동)
  const handleComment = () => {
    navigate(`/contents/${data.feedId}`);
  };

  //좋아요 불러오기
  useEffect(() => {
    fetch(`${API_ADDRESS}/likes/${data.feedId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => res.json())
      .then(res => {
        const { liked } = res;
        if (liked === true || liked === false) {
          setHeart(liked);
          setLikesCount(parseInt(data.likesCount));
          return;
        }
      });
  }, []);

  if (data === undefined || JSON.stringify(data) === JSON.stringify({})) return;

  return (
    <div className="dashboard">
      {showModal && (
        <>
          <ModalBackground onClick={() => setShowModal(false)} />
          <StyledLoginContentContainer
            onClose={() => setShowModal(false)}
            setShowModal={setShowModal}
            url={url}
          />
        </>
      )}
      <Container scale={scale}>
        <Head>
          <div className="headLeft">
            <div className="user" onClick={handleUser}>
              <ProfileImage src={data.profileImageUrl} width={30} />
              <div className="bold">{data.userName}</div>
            </div>
          </div>
          <div className="time">{data.createdAt.slice(0, 10)}</div>
        </Head>

        <ImageLabel>
          <Carousel
            imageList={data.contentUrls}
            handleImageClick={handleImageClick}
            searchParams={searchParams}
          />
        </ImageLabel>

        <ArticleContent content={data.feedDescription} length={120} />
        <Tail>
          <div className="heartPart" onClick={handleHeart}>
            <HeartIcon icon={heartMode[heart]} size="2x" isSelect={heart} />
            <div className="heartCount">{likesCount}</div>
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

const StyledLoginContentContainer = styled(LoginModal)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 999;
`;

export default Dashboard;
