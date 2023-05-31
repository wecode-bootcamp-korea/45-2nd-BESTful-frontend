import React, { useEffect, useState } from 'react';
import FilterCategory from '../Main/components/FilterCategory';
import styled from 'styled-components';
import Dashboard from '../../components/Dashboard/Dashboard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from 'react-router-dom';
import BestCarousel from './components/BestCarousel';
import MainFooter from '../Main/components/MainFooter';

const limit = 3;

const Best = () => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );
  const queryString = searchParams.toString();

  const fetchData = () => {
    fetch(
      `http://10.58.52.185:3000/feeds/best?from=${
        offset + limit
      }&count=${limit}&${queryString}`
    )
      .then(res => res.json())
      .then(res => {
        if (res.length < limit) {
          setHasMore(false);
        }
        setTimeout(() => {
          setFeeds(feeds.concat(res));
        }, 1500);
      });
    setOffset(prev => prev + limit);
  };

  useEffect(() => {
    fetch(`http://10.58.52.185:3000/feeds/best?from=0&count=3&${queryString}`)
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
    <>
      <BestCarousel />
      <Container>
        <FilterCategory />
        <DashboardWrapper>
          <Dashboard />
          <Dashboard />
          <Dashboard />
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
    </>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 50px;
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  width: 90%;
`;

export default Best;
