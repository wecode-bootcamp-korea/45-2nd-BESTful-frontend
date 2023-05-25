import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as emptyCheck } from '@fortawesome/free-regular-svg-icons';

const OptionInput = ({
  item: { id, category, content },
  setCheckedElement,
  checkedElement,
}) => {
  const handleRadioButton = e => {
    setCheckedElement(Number(e.target.value));
    searchParams.set(category, e.target.value);
    setSearchParams(searchParams);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <OptionWrapper>
      <input
        type="radio"
        value={id}
        checked={checkedElement === id}
        onChange={handleRadioButton}
      />
      {checkedElement === id ? (
        <FontAwesomeIcon icon={faCircleCheck} className="radioIcon" />
      ) : (
        <FontAwesomeIcon icon={emptyCheck} />
      )}
      {content}
    </OptionWrapper>
  );
};

const OptionWrapper = styled.label`
  ${variables.flex('none', 'none', 'center')};
  gap: 8px;
  margin-bottom: 8px;

  input {
    display: none;
  }

  .radioIcon {
    color: ${props => props.theme.style.orange};
  }
`;

export default OptionInput;
