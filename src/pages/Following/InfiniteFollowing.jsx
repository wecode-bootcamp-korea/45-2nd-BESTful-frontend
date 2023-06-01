import React, { useEffect, useState } from 'react';
import MainFooter from '../Main/components/MainFooter';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';
import Dashboard from '../../components/Dashboard/Dashboard';
import EndMsg from '../../components/InfiniteScroll/EndMsg';
import Loading from '../../components/InfiniteScroll/Loading';
import FilterCategory from '../Main/components/FilterCategory';
import { useSearchParams } from 'react-router-dom';
import { API_ADDRESS } from '../../utils/API_ADDRESS';
import TopButton from '../../components/InfiniteScroll/TopButton';

const LIMIT = 3;

const InfiniteFollowing = () => {
  const [followerFeeds, setFollowerFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );

  // 새로고침 시, 쿼리스트링 지우기
  useEffect(() => {
    setSearchParams(new URLSearchParams());
  }, []);

  const token = localStorage.getItem('resToken');

  useEffect(() => {
    setFollowerFeeds([]);
    const fetchProducts = async () => {
      try {
        // 인코딩
        const queryString = searchParams.toString();

        const response = await fetch(
          `${API_ADDRESS}/feeds/followings?from=0&count=${LIMIT}&${queryString}`,
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
              Authorization: token,
            },
          }
        );
        const data = await response.json();
        setFollowerFeeds(data);

        if (!data || data.length === 0) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const fetchMoreFollowingFeeds = async () => {
    try {
      const offset = followerFeeds?.length;
      // 인코딩
      const queryString = searchParams.toString();

      const response = await fetch(
        `${API_ADDRESS}/feeds/followings?from=${offset}&count=${LIMIT}&${queryString}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      const newProducts = data;

      if (newProducts.length === 0) {
        setHasMore(false);
      }
      setFollowerFeeds(prevFeeds => [...prevFeeds, ...newProducts]);
    } catch (error) {
      console.log(error);
    }
  };

  // refresh 이후, 상단 이동
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <Container>
      <FilterCategory followerFeeds={followerFeeds} />
      <StyledInfiniteScroll
        dataLength={followerFeeds?.length}
        next={fetchMoreFollowingFeeds}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<EndMsg />}
        style={{ overflow: `visible` }}
      >
        {followerFeeds?.map((feed, index) => {
          return (
            <div key={feed.feedId}>
              <Dashboard data={feed} />
            </div>
          );
        })}
      </StyledInfiniteScroll>
      <MainFooter />
      <TopButton />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 30px;
  max-width: 1300px;
  margin: 0 auto;
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

export default InfiniteFollowing;
