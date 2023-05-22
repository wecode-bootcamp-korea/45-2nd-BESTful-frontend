import React, { useEffect, useState } from 'react';
import ProfileImage from '../ProfileImage/ProfileImage';
import TagButton from '../tagButton/TagButton';
import FollowingButton from '../followingButton/FollowingButton';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import variables from '../../styles/variables';
import theme from '../../styles/theme';

const Dashboard = () => {
  const src = '/images/Components/profileImage/brunch.jpg';
  const w =
    'you know we got that vibe, baby~ 해 뜰 때까지~ Look at me, look at me 느낌이 나지~ Look at me, look at me 느낌이 나지~ you know we got that vibe, baby~ 해 질 때까지~';

  const [heart, setHeart] = useState(false);
  const [position, setPosition] = useState({});
  const [tags, setTags] = useState([]);

  const heartMode = {
    false: emptyHeart,
    true: fullHeart,
  };

  const handleHeart = () => {
    setHeart(prev => !prev);
  };

  const handleTag = e => {
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  useEffect(() => {
    if (position.x) {
      setTags(prev => [...prev, position]);
    }
  }, [position]);

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
          <img alt="이미지" src={src} onClick={handleTag} />
          {tags.map((data, index) => {
            return <TagButton key={index} point={data} />;
          })}
        </ImageLabel>
        <Content>
          <div className="main">{w}</div>
          <div className="more">더보기</div>
        </Content>
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
  border: 1px solid #a4acb3;
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

const Content = styled.div`
  padding: 16px 16px 10px;

  .main {
    line-height: 1.5;
  }

  .more {
    margin: 5px 0px;
    color: #a4acb3;
    font-weight: bold;
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
