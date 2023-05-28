import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import ProfileImage from '../ProfileImage/ProfileImage';
import FollowingButton from '../followingButton/FollowingButton';
import ArticleContent from './subComponent/ArticleContent';
import Carousel from './subComponent/Carousel';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import variables from '../../styles/variables';
import theme from '../../styles/theme';

const Dashboard = () => {
  const src = '/images/components/profileImage/brunch.jpg';
  const w =
    'you know we got that vibe, baby~ 해 뜰 때까지~ Look at me, look at me 느낌이 나지~ Look at me, look at me 느낌이 나지~ you know we got that vibe, baby~ 해 질 때까지~';

  const [heart, setHeart] = useState(false);

  const { loading, data, error } = useFetch([], '/data/tagData.json', {
    method: 'GET',
  });

  const heartMode = {
    false: emptyHeart,
    true: fullHeart,
  };

  const handleHeart = () => {
    setHeart(prev => !prev);
  };

  if (error) return alert(error);
  if (loading) return null;

  return (
    <div className="dashboard">
      <Wrapper>
        <Head>
          <div className="headLeft">
            <ProfileImage src={src} width={30} />
            <div className="bold"> 미키</div>
            <FollowingButton init={false} width="80px" height="30px" />
          </div>
          <div className="time">23.05.23</div>
        </Head>

        <ImageLabel>
          <Carousel imageList={data} />
        </ImageLabel>

        <ArticleContent content={w} length={120} />
        <Tail>
          <div className="first">
            <HeartIcon
              icon={heartMode[heart]}
              size="2x"
              onClick={handleHeart}
              isSelect={heart}
            />
            <div className="heartCount">5</div>
          </div>
          <div>
            <FontAwesomeIcon icon={faComment} size="2x" />
          </div>
        </Tail>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 552px;
  margin-left: 100px;
  border: 1px solid #a4acb3;
  background-color: white;
`;

const Head = styled.div`
  ${variables.flex('row', 'space-between')};
  height: 60px;
  padding: 15px 16px;

  .headLeft {
    ${variables.flex('row', 'none')};
    margin-right: 10px;

    .bold {
      margin: 0px 10px;
      font-weight: bold;
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

  .first {
    ${variables.flex('row')};
    .heartCount {
      margin-left: 10px;
    }
  }
`;

const HeartIcon = styled(FontAwesomeIcon)`
  color: ${props => (props.isSelect ? theme.orange : 'black')};
`;
export default Dashboard;
