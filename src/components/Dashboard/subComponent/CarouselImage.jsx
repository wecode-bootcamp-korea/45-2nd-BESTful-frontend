import React from 'react';
import TagButton from '../../tagButton/TagButton';

const CarouselImage = ({
  src, //캐러셀 이미지 src
  imgIndex, //해당 이미지의 인덱스
  infoList, //해당 이미지에 부착된 태그와 정보(태그의 갯수만큼 배열에 객체 존재)
  handleONDashTag, //태그 위에 마우스함수 (모달 ON)
  handleOFFDashTag, //태그 밖에 마우스함수 (모달 OFF)
  translationX, //태그버튼이 사진 양옆 끝에 있을때 x좌표 옮겨주는 함수
  handleImageClick, //해당 이미지 클릭시 함수 (피드 상세페이지로 이동)
}) => {
  return (
    <div onClick={() => handleImageClick(imgIndex)}>
      <img alt="이미지" src={src} />
      {infoList.map((tag, index) => {
        const xPos = translationX(parseInt(tag.coordinateX));

        const tagPosition = {
          x: xPos + 550 * imgIndex,
          y: parseInt(tag.coordinateY),
        };

        return (
          <TagButton
            key={index}
            point={tagPosition}
            handleONDashTag={() => handleONDashTag(index)}
            handleOFFDashTag={handleOFFDashTag}
          />
        );
      })}
    </div>
  );
};

export default CarouselImage;
