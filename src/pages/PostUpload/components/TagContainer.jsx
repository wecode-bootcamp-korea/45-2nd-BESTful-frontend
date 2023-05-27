import React, { useState } from 'react';
import PostTagModal from '../../../pages/PostUpload/components/PostTagModal';
import PostTagButton from './PostTagButton';

const TagContainer = ({
  tag,
  datas,
  setDatas,
  tags,
  setTags,
  newTags,
  setNewTags,
  currentIndex,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <PostTagButton point={tag} />
      <PostTagModal
        tagData={tag}
        hover={hover}
        datas={datas}
        setDatas={setDatas}
        tags={tags}
        setTags={setTags}
        newTags={newTags}
        setNewTags={setNewTags}
        currentIndex={currentIndex}
      />
    </div>
  );
};

export default TagContainer;
