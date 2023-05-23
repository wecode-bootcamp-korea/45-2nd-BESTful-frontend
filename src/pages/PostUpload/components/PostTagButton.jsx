import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const PostTagButton = ({ point }) => {
  return (
    <Tag x={`${point.coordinateX}px`} y={`${point.coordinateY}px`}>
      <BackIcon icon={faCircle} size="lg" />
      <PlusIcon icon={faCirclePlus} size="lg" />
    </Tag>
  );
};

const Tag = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: ${props => props.y};
  left: ${props => props.x};
  cursor: pointer;
`;

const BackIcon = styled(FontAwesomeIcon)`
  position: absolute;
  transform: translate(-50%, -50%);
  color: ${theme.white};
`;

const PlusIcon = styled(FontAwesomeIcon)`
  position: absolute;
  transform: translate(-50%, -50%);
  color: ${theme.orange};
`;

export default PostTagButton;
