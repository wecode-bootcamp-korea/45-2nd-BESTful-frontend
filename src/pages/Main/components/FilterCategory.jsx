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
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 5;
  height: 100vh;
  ${variables.flex('column', 'none', 'none')};
  gap: 20px;
  width: 300px;
  padding: 8px 12px;
`;

export default FilterCategory;

const GENDER_OPTION = [
  { id: 1, category: 'gender', content: '남' },
  { id: 2, category: 'gender', content: '여' },
];

const SEASON_OPTION = [
  { id: 1, category: 'season', content: 'S/S' },
  { id: 2, category: 'season', content: 'F/W' },
];

const STYLE_OPTION = [
  { id: 1, category: 'style', content: 'Casual' },
  { id: 2, category: 'style', content: 'Dandy' },
  { id: 3, category: 'style', content: 'Street' },
  { id: 4, category: 'style', content: 'Sports' },
];

const FILTER_TITLE = [
  { id: 0, name: 'WOMEN / MEN', option: GENDER_OPTION },
  { id: 1, name: 'SEASON', option: SEASON_OPTION },
  { id: 2, name: 'STYLE', option: STYLE_OPTION },
];
