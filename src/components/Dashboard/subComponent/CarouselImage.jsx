import React, { useEffect, useState } from 'react';
import TagButton from '../../tagButton/TagButton';

const CarouselImage = ({
  src,
  index,
  tags,
  handleONDashTag,
  handleOFFDashTag,
  translationX,
}) => {
  return (
    <div>
      <img alt="이미지" src={src} />
      {tags.map((data, idx) => {
        const xPos = translationX(data.x);
        const tagPosition = { x: xPos + 550 * index, y: data.y };
        return (
          <TagButton
            key={idx}
            point={tagPosition}
            handleONDashTag={() => handleONDashTag(idx)}
            handleOFFDashTag={handleOFFDashTag}
          />
        );
      })}
    </div>
  );
};

export default CarouselImage;
