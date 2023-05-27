import React, { useEffect, useState } from 'react';
import FilterCategory from '../Main/components/FilterCategory';
import MainFooter from '../Main/components/MainFooter';
import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import InfiniteScroll from 'react-infinite-scroll-component';

const limit = 3;

const Following = () => {
  const [feeds, setFeeds] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );
  const queryString = searchParams.toString();

  const fetchData = () => {
    /* fetch(
      `http://10.58.52.108:3700/feeds/following?from=${
        offset + limit
      }&count=${limit}&${queryString}`
    ) */
    fetch(
      `/data/feedList.json/following?from=${
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
    /* fetch(`http://10.58.52.108:3700/feeds/following?from=0&count=3&${queryString}`) */
    fetch(`/data/feedList.json`)
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
      <FilterCategory feeds={feeds} />
      <StyledInfiniteScroll
        dataLength={feeds.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading>로딩중</Loading>}
        endMessage={<h3>마지막 피드입니다</h3>}
      >
        {feeds?.map((feed, index) => (
          <Dashboard key={feed.feedId} feed={feed} />
        ))}
      </StyledInfiniteScroll>
      <MainFooter />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  max-width: 1100px;
  margin: 0 auto;
`;

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const Loading = styled.div`
  padding-left: 100px;
  text-align: center;
`;

export default Following;
