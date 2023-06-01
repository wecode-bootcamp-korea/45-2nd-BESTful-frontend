import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import MainFooter from './components/MainFooter';
import Dashboard from '../../components/Dashboard/Dashboard';
import EndMsg from '../../components/InfiniteScroll/EndMsg';
import Loading from '../../components/InfiniteScroll/Loading';
import FilterCategory from './components/FilterCategory';
import TopButton from '../../components/InfiniteScroll/TopButton';
import { useSearchParams } from 'react-router-dom';
import { API_ADDRESS } from '../../utils/API_ADDRESS';

const LIMIT = 3;

const InfiniteMain = () => {
  const [mainFeeds, setMainFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );

  // 새로고침 시, 쿼리스트링 지우기
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
    setSearchParams(new URLSearchParams());
  }, []);

  useEffect(() => {
    setMainFeeds([]);
    const fetchMainFeeds = async () => {
      try {
        // 인코딩
        const queryString = searchParams.toString();

        const response = await fetch(
          `${API_ADDRESS}/feeds?from=0&count=${LIMIT}&${queryString}`
        );
        const data = await response.json();
        setMainFeeds(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMainFeeds();
    setHasMore(true);
  }, [searchParams]);

  const fetchMoreMainFeeds = async () => {
    try {
      const offset = mainFeeds?.length;
      // 인코딩
      const queryString = searchParams.toString();

      const response = await fetch(
        `${API_ADDRESS}/feeds?from=${offset}&count=${LIMIT}&${queryString}`
      );
      const data = await response.json();
      const newMainFeeds = data;

      if (newMainFeeds.length === 0 || newMainFeeds.length < 3) {
        setHasMore(false);
      }
      setMainFeeds(prevFeeds => [...prevFeeds, ...newMainFeeds]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <FilterCategory />
      <StyledInfiniteScroll
        dataLength={mainFeeds?.length}
        next={fetchMoreMainFeeds}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<EndMsg />}
        scrollThreshold={0.8}
      >
        {mainFeeds?.map((feed, index) => (
          <Dashboard key={index} data={feed} searchParams={searchParams} />
        ))}
      </StyledInfiniteScroll>
      <TopButton />
      <MainFooter />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 15px;
  max-width: 1300px;
  margin: 0 auto;
  height: unset;
  margin-top: 40px;
`;

const StyledInfiniteScroll = styled(InfiniteScroll)`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding-right: 120px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export default InfiniteMain;
