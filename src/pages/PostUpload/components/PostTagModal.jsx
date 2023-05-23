import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';

const PostTagModal = ({ tagData, hover }) => {
  return (
    <div>
      {hover && (
        <Modal x={`${tagData.coordinateX}px`} y={`${tagData.coordinateY}px`}>
          <Triangle />
          <Rectangle>
            <div>[{tagData.tagContent}]</div>
            <div>{tagData.clothName}</div>
            <div>{Number(tagData.clothPrice).toLocaleString()}원</div>
            <div>
              <span>#{tagData.style} </span>
              <span>#{tagData.season}</span>
            </div>
            <div>
              구매처: <span>{tagData.clothBuyingLink}</span>
            </div>
            <div>
              설명: <span>{tagData.clothInformation}</span>
            </div>
          </Rectangle>
        </Modal>
      )}
    </div>
  );
};

const Modal = styled.div`
  ${variables.flex('column')};
  width: 200px;
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
  width: 200px;
  height: 100px;
  border-radius: 5px;
  background-color: beige;
  opacity: 0.8;
`;

export default PostTagModal;
