import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';

const PostTagModal = ({
  tagData,
  hover,
  datas,
  setDatas,
  setTags,
  setNewTags,
  currentIndex,
}) => {
  const deleteTag = () => {
    const copiedDatas = [...datas];
    const copiedTags = copiedDatas.find(
      data => data.id === currentIndex
    ).clothesInfo;
    const newtags = copiedTags.filter(tag => tag.id !== tagData.id);
    setTags(newtags);
    setNewTags(newtags);

    copiedDatas.find(data => data.id === currentIndex).clothesInfo = newtags;
    setDatas(copiedDatas);
  };
  return (
    <div>
      {hover && (
        <Modal x={`${tagData.coordinateX}px`} y={`${tagData.coordinateY}px`}>
          <Triangle />
          <Rectangle>
            <div className="info">[{tagData.tagContent}]</div>
            <div className="name">{tagData.clothName}</div>
            <div className="price">
              {Number(tagData.clothPrice).toLocaleString()}원
            </div>
            <div className="hash">
              <HashTag># {tagData.style}</HashTag>
              <HashTag># {tagData.season}</HashTag>
            </div>
            <Details>
              <div>구매처:</div>
              <div>{tagData.clothBuyingLink}</div>
            </Details>
            <Details>
              <div>설명:</div>
              <div>{tagData.clothInformation}</div>
            </Details>
            <DeleteTag>
              <span onClick={deleteTag}>삭제</span>
            </DeleteTag>
          </Rectangle>
        </Modal>
      )}
    </div>
  );
};

const Modal = styled.div`
  ${variables.flex('column')};
  position: absolute;
  transform: translate(-50%, 10px);
  top: ${props => props.y};
  left: ${props => props.x};
  z-index: 5;
`;

const Triangle = styled.div`
  width: 0px;
  height: 0px;
  border-bottom: 14px solid beige;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  opacity: 0.8;
`;

const DeleteTag = styled.div`
  margin-top: 10px;
  color: ${theme.orange};
  display: flex;
  justify-content: center;
  span {
    cursor: pointer;
  }
`;

const Rectangle = styled.div`
  width: 210px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #fe4600;
  opacity: 0.9;

  .info {
    color: #828c94;
  }

  .name {
    margin: 10px 0px;
    font-size: 30px;
    font-weight: bold;
  }

  .price {
    font-size: 20px;
  }
`;

const HashTag = styled.div`
  display: inline-flex;
  margin: 10px 5px 2px 0px;
  padding: 3px 5px 6px;
  border-radius: 5px;
  background-color: #fe4600;
  color: white;

  &:last-child {
    margin-right: 0px;
  }
`;

const Details = styled.div`
  display: flex;
  margin-top: 5px;

  .title {
    flex-shrink: 60px;
    width: 60px;
  }

  .detailInfo {
    flex-basis: 150px;
  }
`;

export default PostTagModal;
