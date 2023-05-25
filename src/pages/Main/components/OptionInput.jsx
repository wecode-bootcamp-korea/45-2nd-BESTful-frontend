import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import { BsCheckCircleFill, BsCheckCircle } from 'react-icons/bs';
import { useSearchParams } from 'react-router-dom';

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
        <BsCheckCircleFill className="radioIcon" />
      ) : (
        <BsCheckCircle />
      )}
      <OptionText>{content}</OptionText>
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

const OptionText = styled.div``;

export default OptionInput;
