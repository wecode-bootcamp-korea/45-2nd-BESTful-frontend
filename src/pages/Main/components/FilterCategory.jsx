import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import FilterDetail from './FilterDetail';
import variables from '../../../styles/variables';
import { useParams, useSearchParams } from 'react-router-dom';

const FilterCategory = () => {
  const [feeds, setFeeds] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [isSorted, setIsSorted] = useState(false);

  const handleSort = sort => {
    searchParams.set('orderBy', sort);
    setSearchParams(searchParams);
  };

  /*   
// 서버 통신용 코드
  const FEED_API = `https://localhost:3000`;

  useEffect(() => {
    fetch(`${FEED_API}/${id}&${searchParams.toString()}`)
      .then(response => response.json())
      .then(response => {
        setFeeds(response);
      });
  }, [id, searchParams]); 
  */

  return (
    <Container>
      <button
        className="sort-button"
        onClick={() => setIsSorted(prev => !prev)}
      >
        <span className="sort-by">정렬 기준</span>
        <img
          className="sort-img"
          alt="더보기"
          src={`/images/icon/${
            isSorted ? 'angle-up-solid' : 'angle-down-solid'
          }.svg`}
        />
      </button>
      {isSorted && (
        <ul className="sort-list">
          {SORT_MENU.map(({ id, content, sort }) => (
            <li key={id} onClick={() => handleSort(sort)}>
              {content}
            </li>
          ))}
        </ul>
      )}

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
  width: 15%;
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

const SORT_MENU = [
  { id: 0, content: 'Best', sort: 'best' },
  { id: 1, content: 'Following', sort: 'following' },
];
