import React, { useEffect, useState } from 'react';
import CarouselImage from './CarouselImage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import ArrowButton from './ArrowButton';
import TagModal from './TagModal';

const Carousel = ({ imageList }) => {
  const [current, setCurrent] = useState(0);
  const [tags, setTags] = useState([]); //모든 태그 위치
  const [modal, setModal] = useState(false); //모달 on/off
  const [curTag, setCurTag] = useState(0); // 현재 클릭한 태그
  const [position, setPostion] = useState({}); // 현재 클릭한 태그의 위치

  const translationX = curX => {
    let x = curX;
    if (curX < 20) {
      x = curX + 10;
    } else if (curX > 530) {
      x = curX - 10;
    }
    return x;
  };

  const handleONDashTag = idx => {
    setModal(true);
    setCurTag(idx);
    const xPos = translationX(tags[idx]?.x);
    setPostion({ x: xPos, y: tags[idx]?.y });
  };

  const handleOFFDashTag = () => {
    setModal(false);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true,
    beforeChange: (slide, newSlide) => setCurrent(newSlide),
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

  useEffect(() => {
    setTags(imageList[current]?.tags);
  }, [current]);

  return (
    <Container>
      <StyledSlider {...settings}>
        {imageList.map((data, index) => {
          return (
            <CarouselImage
              key={data.id}
              src={data.src}
              index={index}
              tags={data.tags}
              handleONDashTag={handleONDashTag}
              handleOFFDashTag={handleOFFDashTag}
              translationX={translationX}
            />
          );
        })}
      </StyledSlider>
      {modal && <TagModal point={position} />}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 20px;
`;

const StyledSlider = styled(Slider)`
  img {
    width: 550px;
    height: 550px;
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
