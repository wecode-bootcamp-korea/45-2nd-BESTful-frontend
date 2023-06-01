import React, { useEffect, useState, useRef } from 'react';
import CarouselImage from './CarouselImage';
import styled from 'styled-components';
import ArrowButton from './ArrowButton';
import TagModal from './TagModal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ imageList, handleImageClick, searchParams }) => {
  const imgRef = useRef([]); //이미지 useRef
  const [current, setCurrent] = useState(0); //현재 이미지 인덱스
  const [clothesInfo, setClothesInfo] = useState([]); //해당 이미지에 부착된 태그위치와 옷 정보(모달을 위한 배열, 태그의 갯수만큼 배열에 객체 존재, 해당 이미지의 n개의 태그이어서 배열형태)
  const [modal, setModal] = useState(false); //모달 on/off
  const [curTag, setCurTag] = useState(0); // 해당 이미지에서 현재 선택한 태그의 인덱스
  const [position, setPostion] = useState({ x: 0, y: 0 }); // 모달이 띄워질 위치 (현재 선택한 태그의 위치)

  //태그버튼이 사진 끝에 있을때 x, y 좌표 옮겨주는 함수
  // (태그가 다음 이미지에 침범하지 않도록하기 위해 구현- 태그버튼 20X20)
  const transformPos = (curX, curY, width, height) => {
    let x = parseInt(curX);
    let y = parseInt(curY);

    if (!height || height === 0) {
      return { x: x, y: y };
    }

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

  //태그 위에 마우스함수 (모달 ON)
  const handleONDashTag = tagIdx => {
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
    setModal(true);
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
  }, [current, searchParams]);
  return (
    <Container>
      <StyledSlider {...settings}>
        {imageList &&
          imageList?.length !== 0 &&
          imageList?.map((imgData, index) => {
            return (
              <CarouselImage
                key={index}
                src={imgData.contentUrl}
                imgIndex={index}
                infoList={imgData.clothesInfo}
                handleONDashTag={handleONDashTag}
                handleOFFDashTag={handleOFFDashTag}
                imgRef={imgRef}
                transformPos={transformPos}
                handleImageClick={handleImageClick}
                searchParams={searchParams}
                modal={modal}
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
