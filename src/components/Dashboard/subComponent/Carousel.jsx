import React, { useEffect, useState } from 'react';
import CarouselImage from './CarouselImage';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import ArrowButton from './ArrowButton';

const Carousel = ({ imageList }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log(current);
  }, [current]);

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

  return (
    <Container>
      <StyledSlider {...settings}>
        {imageList.map((data, index) => {
          return (
            <CarouselImage
              key={data.id}
              src={data.src}
              index={index}
              tagList={data.tags}
            />
          );
        })}
      </StyledSlider>
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
