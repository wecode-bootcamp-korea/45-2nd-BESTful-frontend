import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';

const TagModal = ({ point }) => {
  return (
    <Modal x={`${point.x}px`} y={`${point.y}px`}>
      <Triangle />
      <Rectangle>
        <div>샤넬</div>
      </Rectangle>
    </Modal>
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

export default TagModal;
