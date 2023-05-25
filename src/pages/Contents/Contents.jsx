import React, { useState } from 'react';
import ProfileImage from '../../components/ProfileImage/ProfileImage';
import SidePhoto from './component/SidePhoto';
import FeedImage from './component/FeedImage';
import ProfileBox from './component/ProfileBox';
import Comment from './component/Comment';
import SideBar from './component/SideBar';
import useFetch from '../../hooks/useFetch';
import styled from 'styled-components';
import variables from '../../styles/variables';

const Contents = () => {
  const src = '/images/components/profileImage/brunch.jpg';
  const w =
    'you know we got that vibe, baby~ 해 뜰 때까지~ Look at me, look at me 느낌이 나지~ Look at me, look at me 느낌이 나지~ you know we got that vibe, baby~ 해 질 때까지~';

  const [current, setCurrent] = useState(0);
  const [tags, setTags] = useState([]); //모든 태그 위치
  const [modal, setModal] = useState(false); //모달 on/off
  const [curTag, setCurTag] = useState(0); // 현재 클릭한 태그
  const [position, setPostion] = useState({}); // 현재 클릭한 태그의 위치

  const handleONImage = imgIdx => {
    setTags(data[imgIdx]?.tags);
    setCurrent(imgIdx);
  };

  const handleONDashTag = tagIdx => {
    setModal(true);
    setCurTag(tagIdx);
    setPostion({ x: tags[tagIdx]?.x, y: tags[tagIdx]?.y });
  };

  const handleOFFDashTag = () => {
    setModal(false);
  };

  const { loading, data, error } = useFetch([], '/data/tagData.json', {
    method: 'GET',
  });

  if (error) return alert(error);
  if (loading) return null;

  return (
    <Container>
      <SidePhoto data={data} />
      <LeftSide>
        <ProfileBox src={src} width={50} />
        <ImagePart>
          <FeedImage
            key={data[0]?.id}
            index={0}
            src={data[0]?.src}
            tags={data[0]?.tags}
            handleONDashTag={handleONDashTag}
            handleOFFDashTag={handleOFFDashTag}
            handleONImage={handleONImage}
            modal={modal}
            position={position}
            current={current}
          />
          <div className="writing">{w}</div>
          {data &&
            data.length > 1 &&
            data.map((img, index) => {
              if (index !== 0)
                return (
                  <FeedImage
                    key={img.id}
                    index={index}
                    src={img.src}
                    tags={img.tags}
                    handleONDashTag={handleONDashTag}
                    handleOFFDashTag={handleOFFDashTag}
                    handleONImage={handleONImage}
                    modal={modal}
                    position={position}
                    current={current}
                  />
                );
            })}
        </ImagePart>
        <ProfileBox />
        <Comment />
      </LeftSide>
      <RightSide>
        <SideBar />
      </RightSide>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 50px 0px 50px 100px;
  .writing {
    font-size: 20px;
    line-height: 150%;
  }
`;

const LeftSide = styled.div`
  width: 630px;
  margin: 0px 60px;
  padding: 0px 40px;

  .profile {
    ${variables.flex('row', 'flex-start', 'center')}

    .name {
      margin-left: 10px;
      font-weight: bold;
    }
  }

  .writing {
    padding: 0px 0px 60px;
  }
`;

const ImagePart = styled.div`
  border-bottom: 1px solid #c2c8cc;
`;

const RightSide = styled.div``;

export default Contents;
