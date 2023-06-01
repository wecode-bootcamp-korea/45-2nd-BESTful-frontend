import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidePhoto from './component/SidePhoto';
import FeedImage from './component/FeedImage';
import ProfileBox from './component/ProfileBox';
import Comment from './component/Comment';
import SideBar from './component/SideBar';
import styled from 'styled-components';
import variables from '../../styles/variables';

const Contents = () => {
  const params = useParams();
  const imgRef = useRef([]); //이미지 useRef
  const commentRef = useRef(); // 댓글 아이콘 useRef
  const feedId = params.id; // feedId

  const [data, setData] = useState({}); // 현재 피드 데이터
  const [current, setCurrent] = useState(0); //현재 이미지 인덱스
  const [clothesInfo, setClothesInfo] = useState([]); //해당 이미지에 부착된 태그위치와 옷 정보(모달을 위한 배열, 태그의 갯수만큼 배열에 객체 존재, 해당 이미지의 n개의 태그이어서 배열형태)
  const [modal, setModal] = useState(false); //모달 on/off
  const [curTag, setCurTag] = useState(0); // 현재 클릭한 태그
  const [position, setPostion] = useState({}); // 현재 클릭한 태그의 위치

  // 댓글창으로 스크롤 이동 (SideBar의 댓글 아이콘 클릭시)
  const onMoveComment = () => {
    commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // 해당 이미지로 스크롤 이동 (SidePhoto의 해당 이미지 클릭시)
  const onMoveImg = idx => {
    imgRef.current[idx].scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  //태그버튼이 사진 끝에 있을때 x, y 좌표 옮겨주는 함수
  // (태그가 다음 이미지에 침범하지 않도록하기 위해 구현- 태그버튼 20X20)
  const transformPos = (curX, curY, width, height) => {
    let x = parseInt(curX);
    let y = parseInt(curY);

    if (height === undefined || height === 0) return { x: x, y: y };

    if (x < 20) {
      x = x + 10;
    } else if (x > width - 20) {
      x = x - 10;
    }

    if (y < 10) {
      y = y + 10;
    } else if (y > height - 20) {
      y = y - 10;
    }

    return { x: x, y: y };
  };

  // 이미지 위에 마우스함수 (해당 이미지 인덱스 설정)
  //현재 모여주는 이미지 바뀔때마다 태그위치와 옷정보 변경
  const handleONImage = imgIdx => {
    setClothesInfo(data.contentUrls[imgIdx]?.clothesInfo);
    setCurrent(imgIdx);
  };

  //태그 위에 마우스함수 (모달 ON)
  const handleONDashTag = tagIdx => {
    setModal(true);
    let tagPosition;

    // 모달 위
    if (tagIdx !== 0 && !tagIdx) {
      tagPosition = transformPos(
        clothesInfo[curTag]?.coordinateX,
        clothesInfo[curTag]?.coordinateY,
        imgRef.current[current]?.offsetWidth,
        imgRef.current[current]?.offsetHeight
      );
    }

    //태그버튼 위
    else {
      setCurTag(tagIdx); //현재 태그 인덱스 설정

      tagPosition = transformPos(
        clothesInfo[tagIdx]?.coordinateX,
        clothesInfo[tagIdx]?.coordinateY,
        imgRef.current[current]?.offsetWidth,
        imgRef.current[current]?.offsetHeight
      );
    }
    setPostion(tagPosition); //현재 태그의 위치로 모달의 위치 결정
  };

  //태그 밖에 마우스함수 (모달 OFF)
  const handleOFFDashTag = () => {
    setModal(false);
  };

  //피드 데이터 불러오기
  useEffect(() => {
    fetch(`http://10.58.52.185:3000/feeds/${feedId}`)
      .then(res => res.json())
      .then(res => {
        const [data] = res;
        setData(data);
      });
  }, []);

  if (JSON.stringify(data) === JSON.stringify({})) return;
  return (
    <Container>
      <SidePhoto data={data.contentUrls} onMoveImg={onMoveImg} />
      <LeftSide>
        <ProfileBox
          src={data.profileImageUrl}
          userId={data.userId}
          userName={data.userName}
          createdAt={data.createdAt}
        />
        <ImagePart>
          <FeedImage
            key={0}
            imgIndex={0}
            src={data.contentUrls[0]?.contentUrl}
            infoList={data.contentUrls[0]?.clothesInfo}
            handleONDashTag={handleONDashTag}
            handleOFFDashTag={handleOFFDashTag}
            handleONImage={handleONImage}
            modal={modal}
            position={position}
            current={current}
            curTag={curTag}
            imgRef={imgRef}
            transformPos={transformPos}
          />
          <div className="writing">{data.feedDescription}</div>
          {data.contentUrls &&
            data.contentUrls.length > 1 &&
            data.contentUrls.map((img, index) => {
              if (index !== 0)
                return (
                  <FeedImage
                    key={index}
                    imgIndex={index}
                    src={img.contentUrl}
                    infoList={img.clothesInfo}
                    handleONDashTag={handleONDashTag}
                    handleOFFDashTag={handleOFFDashTag}
                    handleONImage={handleONImage}
                    modal={modal}
                    position={position}
                    current={current}
                    curTag={curTag}
                    imgRef={imgRef}
                    transformPos={transformPos}
                  />
                );
            })}
        </ImagePart>
        <ProfileBox
          src={data.profileImageUrl}
          userId={data.userId}
          userName={data.userName}
          createdAt={data.createdAt}
        />
        <Comment feedId={data.feedId} commentRef={commentRef} />
      </LeftSide>
      <RightSide>
        <SideBar
          likes={data.likesCount}
          onMoveComment={onMoveComment}
          feedId={data.feedId}
        />
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
