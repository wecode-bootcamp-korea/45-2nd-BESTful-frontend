import React, { useState, useEffect } from 'react';
import FilterCategory from '../../pages/Main/components/FilterCategory';
import MainFooter from '../../pages/Main/components/MainFooter';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import Dashboard from '../../components/Dashboard/Dashboard';
import { useSearchParams } from 'react-router-dom';

const limit = 3;

const MainInfinite = () => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );
  const queryString = searchParams.toString();

  const fetchData = () => {
    fetch(
      `http://10.58.52.108:3700/feeds?from=${
        offset + limit
      }&count=${limit}&${queryString}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.length < limit) {
          setHasMore(false);
        }
        setFeeds(feeds.concat(res));
      });
    setOffset(prev => prev + limit);
  };

  useEffect(() => {
    fetch(`http://10.58.52.108:3700/feeds?from=0&count=3&${queryString}`)
      .then(res => res.json())
      .then(res => {
        if (res.length < limit) {
          setHasMore(false);
        }
        setFeeds(res);
      });
  }, [queryString]);

  useEffect(() => {
    setSearchParams(new URLSearchParams());
  }, []);

  return (
    <Container>
      <FilterCategory />
      <DashboardWrapper>
        <InfiniteScroll
          dataLength={feeds.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<div>로딩중</div>}
          endMessage={<h3>마지막 피드입니다</h3>}
        >
          {feeds?.map((feed, index) => (
            <>
              <div>{index}</div>
              <Dashboard feed={feed} />
            </>
          ))}
        </InfiniteScroll>
      </DashboardWrapper>
      <MainFooter />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  width: 90%;
`;
export default MainInfinite;
