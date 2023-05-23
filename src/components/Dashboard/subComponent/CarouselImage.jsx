import React, { useEffect, useState } from 'react';
import TagButton from '../../tagButton/TagButton';

const CarouselImage = ({ src, index, tagList }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setTags(tagList);
  }, []);

  return (
    <div>
      <img alt="이미지" src={src} />
      {tags.map((data, idx) => {
        let xPos = data.x;
        if (data.x < 20) {
          xPos = data.x + 10;
        } else if (data.x > 530) {
          xPos = data.x - 10;
        }
        const tagPosition = { x: xPos + 550 * index, y: data.y };
        return <TagButton key={idx} point={tagPosition} />;
      })}
    </div>
  );
};

export default CarouselImage;
