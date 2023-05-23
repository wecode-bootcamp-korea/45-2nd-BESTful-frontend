import React from 'react';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const ArrowButton = ({ left }) => {
  return (
    <Container>
      <BackIcon icon={faCircle} size="2xl" />
      <ArrowIcon icon={left ? faAngleLeft : faAngleRight} />
    </Container>
  );
};

const Container = styled.button`
  position: absolute;
  transform: translate(-50%, -50%);
  z-index: 1;
  cursor: pointer;
`;

const BackIcon = styled(FontAwesomeIcon)`
  position: absolute;
  transform: translate(-50%, -50%);
  color: white;
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  position: absolute;
  transform: translate(-50%, -50%);
  color: black;
`;

export default ArrowButton;
