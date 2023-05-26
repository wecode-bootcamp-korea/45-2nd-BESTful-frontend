import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarouselImage from './CarouselImage';
import styled from 'styled-components';
import ArrowButton from './ArrowButton';
import TagModal from './TagModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ imageList, handleImageClick }) => {
  const [current, setCurrent] = useState(0); //현재 이미지 인덱스
  const [clothesInfo, setClothesInfo] = useState([]); //해당 이미지에 부착된 태그위치와 옷 정보(모달을 위한 배열, 태그의 갯수만큼 배열에 객체 존재, 해당 이미지의 n개의 태그이어서 배열형태)
  const [modal, setModal] = useState(false); //모달 on/off
  const [curTag, setCurTag] = useState(0); // 해당 이미지에서 현재 선택한 태그의 인덱스
  const [position, setPostion] = useState({ x: 0, y: 0 }); // 모달이 띄워질 위치 (현재 선택한 태그의 위치)

  //태그버튼이 사진 양옆 끝에 있을때 x좌표 옮겨주는 함수
  // (태그가 다음 이미지에 침범하지 않도록하기 위해 구현- 태그버튼 20X20)
  const translationX = curX => {
    let x = curX;
    if (curX < 20) {
      x = curX + 10;
    } else if (curX > 530) {
      x = curX - 10;
    }
    return x;
  };

  //태그 위에 마우스함수 (모달 ON)
  const handleONDashTag = idx => {
    setModal(true);
    if (typeof idx === 'number') {
      setCurTag(idx); //현재 태그 인덱스 설정
      const xPos = translationX(parseInt(clothesInfo[idx]?.coordinateX));
      setPostion({ x: xPos, y: parseInt(clothesInfo[idx].coordinateY) }); //현재 태그의 위치로 모달의 위치 결정
    } else {
      const xPos = translationX(parseInt(clothesInfo[curTag]?.coordinateX));
      setPostion({ x: xPos, y: parseInt(clothesInfo[curTag].coordinateY) }); //현재 태그의 위치로 모달의 위치 결정
    }
  };

  //태그 밖에 마우스함수 (모달 OFF)
  const handleOFFDashTag = () => {
    setModal(false);
  };

  //캐러셀 설정
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    beforeChange: (slide, newSlide) => setCurrent(newSlide), //현재 이미지 인덱스얻는 메서드
    nextArrow: (
      <NextArrow>
        <ArrowButton left={false} />
      </NextArrow>
    ),
    prevArrow: (
      <PrevArrow>
        <ArrowButton left={true} />
      </PrevArrow>
    ),
  };

  //현재 모여주는 이미지 바뀔때마다 태그위치와 옷정보 변경
  useEffect(() => {
    setClothesInfo(imageList[current]?.clothesInfo);
  }, [current]);

  return (
    <Container>
      <StyledSlider {...settings}>
        {imageList.map((imgData, index) => {
          return (
            <CarouselImage
              key={index}
              src={imgData.contentUrl}
              imgIndex={index}
              infoList={imgData.clothesInfo}
              handleONDashTag={handleONDashTag}
              handleOFFDashTag={handleOFFDashTag}
              translationX={translationX}
              handleImageClick={handleImageClick}
            />
          );
        })}
      </StyledSlider>
      {modal && (
        <TagModal
          point={position}
          info={clothesInfo[curTag]}
          handleONDashTag={handleONDashTag}
          handleOFFDashTag={handleOFFDashTag}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;

const StyledSlider = styled(Slider)`
  img {
    width: 550px;
    object-fit: cover;
  }
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide {
    cursor: pointer;
  }
`;

const PrevArrow = styled.div`
  left: 20px;
  z-index: 2;
`;

const NextArrow = styled.div`
  right: 0px;
  z-index: 2;
`;

export default Carousel;
