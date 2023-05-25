import React from 'react';
import TagButton from '../../../components/tagButton/TagButton';
import TagModal from '../../../components/Dashboard/subComponent/TagModal';
import styled from 'styled-components';

const FeedImage = ({
  index,
  src,
  tags,
  handleONDashTag,
  handleOFFDashTag,
  handleONImage,
  modal,
  position,
  current,
}) => {
  return (
    <Container>
      {modal && current === index && <TagModal point={position} />}
      <Image
        alt="피드 이미지"
        src={src}
        onMouseOver={() => handleONImage(index)}
      />
      {tags &&
        tags.map((data, idx) => {
          return (
            <TagButton
              key={idx}
              point={data}
              handleONDashTag={() => handleONDashTag(idx)}
              handleOFFDashTag={handleOFFDashTag}
            />
          );
        })}
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

export default FeedImage;
