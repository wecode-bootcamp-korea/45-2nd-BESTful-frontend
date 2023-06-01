import React, { useEffect } from 'react';
import TagButton from '../../tagButton/TagButton';
import TagModal from './TagModal';

const CarouselImage = ({
  src, //캐러셀 이미지 src
  imgIndex, //해당 이미지의 인덱스
  infoList, //해당 이미지에 부착된 태그와 정보(태그의 갯수만큼 배열에 객체 존재)
  handleONDashTag, //태그 위에 마우스함수 (모달 ON)
  handleOFFDashTag, //태그 밖에 마우스함수 (모달 OFF)
  imgRef, //이미지 useRef
  transformPos, //태그버튼이 사진 끝에 있을때 x, y 좌표 옮겨주는 함수
  handleImageClick, //해당 이미지 클릭시 함수 (피드 상세페이지로 이동)
}) => {
  return (
    <div onClick={() => handleImageClick(imgIndex)}>
      <img
        alt="이미지"
        src={src}
        ref={ele => (imgRef.current[imgIndex] = ele)}
      />
      {infoList &&
        infoList?.length !== 0 &&
        infoList?.map((tag, index) => {
          let tagPosition = transformPos(
            tag.coordinateX,
            tag.coordinateY,
            imgRef.current[imgIndex]?.offsetWidth,
            imgRef.current[imgIndex]?.offsetHeight
          );

          // 캐러셀용 좌표 이동 (캐러셀은 사진 펼쳐져 있음)
          tagPosition.x = tagPosition.x + 550 * imgIndex;

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
    </div>
  );
};

export default CarouselImage;
