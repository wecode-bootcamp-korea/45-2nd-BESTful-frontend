import React, { useState } from 'react';
import PostTagModal from '../../../pages/PostUpload/components/PostTagModal';
import PostTagButton from './PostTagButton';

const TagContainer = ({ tag }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <PostTagButton point={tag} />
      <PostTagModal tagData={tag} hover={hover} />
    </div>
  );
};

export default TagContainer;
