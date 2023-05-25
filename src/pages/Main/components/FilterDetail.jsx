import React, { useState } from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import OptionInput from './OptionInput';

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
          {toggleMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
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
    border-radius: 8px;
    background-color: #eee;
  }
`;

const FilterTitle = styled.div`
  ${variables.flex('none', 'none', 'center')};
  height: 30px;
  font-size: 24px;
  font-weight: 700;
`;

const CategoryContentWrapper = styled.ul`
  display: ${props => (props.toggleMore ? 'block' : 'none')};
  padding-left: 15px;
`;

export default FilterDetail;
