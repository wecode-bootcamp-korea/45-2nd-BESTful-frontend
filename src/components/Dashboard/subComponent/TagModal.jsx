import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';

const TagModal = ({ point, info, handleONDashTag, handleOFFDashTag }) => {
  //return
  if (info === undefined || JSON.stringify(info) === JSON.stringify({})) return;

  return (
    <Modal
      x={`${point.x}px`}
      y={`${point.y}px`}
      onMouseOver={() => handleONDashTag()}
      onMouseLeave={handleOFFDashTag}
    >
      <Triangle />
      <Rectangle>
        <div className="info">[{info.tagContent}]</div>
        <div className="name">{info.clothName}</div>
        <div className="price">{info.clothPrice?.toLocaleString()} 원</div>
        <div className="hash">
          {info.style && <HashTag># {info.style}</HashTag>}
          {info.season && <HashTag># {info.season}</HashTag>}
        </div>

        <Details>
          <div className="title">구매처:</div>
          <div className="detailInfo">{info.clothBuyingLink}</div>
        </Details>
        <Details>
          <div className="title">설명:</div>
          <div className="detailInfo">{info.clothInformation}</div>
        </Details>
      </Rectangle>
    </Modal>
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

export default TagModal;
