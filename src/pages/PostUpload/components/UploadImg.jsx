import React, { useRef, useState } from 'react';
import StyleInput from './StyleInput';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';

const UploadImg = ({
  img,
  datas,
  setDatas,
  index,
  currentIndex,
  element,
  imgIndex,
  imageRef,
}) => {
  const [tags, setTags] = useState([]);
  const [tagMode, setTagMode] = useState(false);
  const [position, setPosition] = useState({});
  const [modal, setModal] = useState(false);

  const handleTag = e => {
    if (!tagMode) return;
    setPosition({
      id: tags.length === 0 ? 1 : tags[tags.length - 1].id + 1,
      coordinateX: e.nativeEvent.offsetX,
      coordinateY: e.nativeEvent.offsetY,
    });
    const newPosition = {
      id: tags.length === 0 ? 1 : tags[tags.length - 1].id + 1,
      coordinateX: e.nativeEvent.offsetX,
      coordinateY: e.nativeEvent.offsetY,
    };
    if (newPosition.x) {
      setTags(prev => [...prev, position]);
      const addedTags = [...tags, position];
      saveTags(addedTags);
    }
    setModal(prev => !prev);
  };

  const deleteItem = () => {
    const copiedDatas = [...datas];
    const newDatas = copiedDatas.filter(data => data.id !== currentIndex);
    if (newDatas.length === 0) {
      setDatas([{ id: 1, contentUrl: '', imgFile: '', clothesInfo: [] }]);
      return;
    }
    setDatas(newDatas);
  };

  const saveTags = addedTags => {
    const copiedDatas = [...datas];
    copiedDatas[index].clothesInfo = addedTags;
    setDatas(copiedDatas);
  };

  const handleTagBtn = e => {
    e.preventDefault();
    setTagMode(prev => !prev);
  };

  return (
    <UploadedImg>
      <img
        onClick={handleTag}
        className="uploadedImage"
        src={img}
        alt="업로드 이미지"
        ref={ele => (imageRef.current[imgIndex] = ele)}
      />
      <StyleInput
        key={index}
        datas={datas}
        setDatas={setDatas}
        tags={tags}
        setTags={setTags}
        point={position}
        modal={modal}
        setModal={setModal}
        index={index}
        currentIndex={currentIndex}
      />
      <div className="functionBox">
        <DeleteBtn onClick={deleteItem}>
          <svg
            className="imgDelete"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            {/*<!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --> */}
            <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
          </svg>
        </DeleteBtn>
        {tagMode ? (
          <button className="taggingBtn" onClick={handleTagBtn}>
            편집 완료
          </button>
        ) : (
          <button className="taggingBtn" onClick={handleTagBtn}>
            + 상품 태그하기
          </button>
        )}
      </div>
    </UploadedImg>
  );
};

const UploadedImg = styled.div`
  width: 550px;
  position: relative;
  margin: 0 24px 0 0;
  .functionBox {
    padding: 0px 12px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    ${variables.flex('row', 'space-between', 'center')}
    .imgDelete {
      width: 20px;
      fill: white;
    }
    .taggingBtn {
      border: none;
      background-color: ${theme.orange};
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      cursor: pointer;
    }
  }
`;

const DeleteBtn = styled.div`
  cursor: pointer;
`;

export default UploadImg;
