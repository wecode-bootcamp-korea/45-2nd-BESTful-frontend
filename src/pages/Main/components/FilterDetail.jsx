import React, { useState } from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import OptionInput from './OptionInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const FilterDetail = ({ name, option }) => {
  const [toggleMore, setToggleMore] = useState(false);
  const [checkedElement, setCheckedElement] = useState(-1);

  const handleToggleMore = () => {
    setToggleMore(prev => !prev);
  };

  return (
    <FilterBox>
      <li>
        {/* title part */}
        <FilterTitleWrapper onClick={handleToggleMore}>
          <FilterTitle>{name}</FilterTitle>
          {toggleMore ? (
            <FontAwesomeIcon icon={faChevronUp} size="sm" />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} size="sm" />
          )}
        </FilterTitleWrapper>
      </li>

      {/* subcategory part */}
      <CategoryContentWrapper toggleMore={toggleMore}>
        {option.map(item => {
          return (
            <OptionInput
              key={item.id}
              item={item}
              checkedElement={checkedElement}
              setCheckedElement={setCheckedElement}
            />
          );
        })}
      </CategoryContentWrapper>
    </FilterBox>
  );
};

const FilterBox = styled.ul`
  ${variables.flex('column', 'none', 'none')};
  gap: 10px;
`;

const FilterTitleWrapper = styled.div`
  ${variables.flex('none', 'space-between', 'center')};

  cursor: pointer;

  &:hover {
    border-radius: 4px;
    background-color: #ff5d2b12;
  }
`;

const FilterTitle = styled.div`
  ${variables.flex('none', 'none', 'center')};
  height: 36px;
  font-size: 17px;
  font-weight: 400;
`;

const CategoryContentWrapper = styled.ul`
  display: ${props => (props.toggleMore ? 'block' : 'none')};
  padding-left: 15px;
`;

export default FilterDetail;
