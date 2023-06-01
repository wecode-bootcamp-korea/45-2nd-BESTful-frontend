import React, { useState, useEffect } from 'react';
import TagButton from '../../../components/tagButton/TagButton';
import TagModal from '../../../components/Dashboard/subComponent/TagModal';
import styled from 'styled-components';

const FeedImage = ({
  src, //캐러셀 이미지 src
  imgIndex, //해당 이미지의 인덱스
  infoList, //해당 이미지에 부착된 태그와 정보(태그의 갯수만큼 배열에 객체 존재)
  handleONDashTag, //태그 위에 마우스함수 (모달 ON)
  handleOFFDashTag, //태그 밖에 마우스함수 (모달 OFF)
  handleONImage, // 이미지 위에 마우스함수 (해당 이미지 인덱스 설정)
  modal, //모달 on/off
  position, // 모달이 띄워질 위치 (현재 선택한 태그의 위치)
  current, //현재 이미지 인덱스
  curTag, // 해당 이미지에서 현재 선택한 태그의 인덱스
  imgRef, //이미지 useRef
  transformPos, //태그버튼이 사진 끝에 있을때 x, y 좌표 옮겨주는 함수
}) => {
  const [hashTag, setHashTag] = useState([]);

  useEffect(() => {
    const hashSet = new Set();
    if (!infoList || infoList.length === 0) return;
    infoList.forEach(data => {
      hashSet.add(data.style).add(data.season);
    });
    setHashTag([...hashSet]);
  }, []);

  return (
    <Container>
      {modal && current === imgIndex && (
        <TagModal
          point={position}
          info={infoList[curTag]}
          handleONDashTag={handleONDashTag}
          handleOFFDashTag={handleOFFDashTag}
        />
      )}
      <Image
        alt={`피드이미지${imgIndex}`}
        src={src}
        onMouseOver={() => handleONImage(imgIndex)}
        ref={ele => (imgRef.current[imgIndex] = ele)}
      />

      {infoList &&
        infoList.map((tag, index) => {
          const tagPosition = transformPos(
            tag.coordinateX,
            tag.coordinateY,
            imgRef.current[imgIndex]?.offsetWidth,
            imgRef.current[imgIndex]?.offsetHeight
          );

          return (
            <TagButton
              key={index}
              tagIndex={index}
              point={tagPosition}
              handleONDashTag={handleONDashTag}
              handleOFFDashTag={handleOFFDashTag}
            />
          );
        })}

      {hashTag &&
        hashTag.map((data, index) => <Hash key={index}>#{data}</Hash>)}
    </Container>
  );
};

const Container = styled.div`
  margin: 10px 0px 80px;
  position: relative;
`;

const Image = styled.img`
  width: 550px;
`;

const Hash = styled.div`
  display: inline-flex;
  margin: 10px 10px 10px 0px;
  color: #fe4600;
`;

export default FeedImage;
