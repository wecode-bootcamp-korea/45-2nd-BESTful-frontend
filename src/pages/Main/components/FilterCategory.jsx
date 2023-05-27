import React from 'react';
import styled from 'styled-components';
import FilterDetail from './FilterDetail';
import variables from '../../../styles/variables';

const FilterCategory = () => {
  return (
    <Container>
      {FILTER_TITLE.map(title => {
        return (
          <FilterDetail
            key={title.id}
            name={title.name}
            option={title.option}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('column', 'none', 'none')};
  gap: 20px;
  width: 200px;
  padding: 8px 12px;
`;

export default FilterCategory;

const GENDER_OPTION = [
  { id: 1, category: 'genderId', content: '남' },
  { id: 2, category: 'genderId', content: '여' },
];

const SEASON_OPTION = [
  { id: 1, category: 'seasonId', content: 'S/S' },
  { id: 2, category: 'seasonId', content: 'F/W' },
];

const STYLE_OPTION = [
  { id: 1, category: 'styleId', content: '캐주얼' },
  { id: 2, category: 'styleId', content: '댄디' },
  { id: 3, category: 'styleId', content: '스트리트' },
  { id: 4, category: 'styleId', content: '스포츠' },
];

const FILTER_TITLE = [
  { id: 0, name: '성별', option: GENDER_OPTION },
  { id: 1, name: '시즌', option: SEASON_OPTION },
  { id: 2, name: '스타일', option: STYLE_OPTION },
];
