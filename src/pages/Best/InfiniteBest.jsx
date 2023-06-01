import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import MainFooter from '../Main/components/MainFooter';
import Dashboard from '../../components/Dashboard/Dashboard';
import FilterCategory from '../Main/components/FilterCategory';
import EndMsg from '../../components/InfiniteScroll/EndMsg';
import Loading from '../../components/InfiniteScroll/Loading';
import { useSearchParams } from 'react-router-dom';
import { API_ADDRESS } from '../../utils/API_ADDRESS';

const LIMIT = 3;

const InfiniteBest = () => {
  const [likedFeeds, setLikedFeeds] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams(
    new URLSearchParams()
  );

  // 새로고침 시, 쿼리스트링 지우기
  useEffect(() => {
    setSearchParams(new URLSearchParams());
  }, []);

  useEffect(() => {
    setLikedFeeds([]);
    const fetchProducts = async () => {
      try {
        // 인코딩
        const queryString = searchParams.toString();

        const response = await fetch(
          `${API_ADDRESS}/feeds/best?orderBy=likesDesc&from=0&count=${LIMIT}&${queryString}`
        );
        const data = await response.json();
        setLikedFeeds(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [searchParams]);

  const fetchMoreProducts = async () => {
    try {
      const offset = likedFeeds?.length;
      // 인코딩
      const queryString = searchParams.toString();

      const response = await fetch(
        `${API_ADDRESS}/feeds/best?orderBy=likesDesc&from=${offset}&count=${LIMIT}&${queryString}`
      );
      const data = await response.json();
      const newProducts = data;

      if (newProducts.length === 0) {
        setHasMore(false);
      }
      setLikedFeeds(prevFeeds => [...prevFeeds, ...newProducts]);
    } catch (error) {
      console.log(error);
    }
  };

  // 새로고침시 상단으로 스크롤
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 800) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return (
    <Container>
      <FilterCategory />
      <StyledInfiniteScroll
        dataLength={likedFeeds?.length}
        next={fetchMoreProducts}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={<EndMsg />}
        style={{ overflow: `visible` }}
      >
        {likedFeeds?.map((feed, index) => {
          return (
            <div key={feed.feedId}>
              <Dashboard data={feed} />
            </div>
          );
        })}
      </StyledInfiniteScroll>
      <MainFooter />
      {showButton && (
        <ScrollContainer>
          <ScrollToTopBtn type="button" onClick={scrollToTop}>
            TOP
          </ScrollToTopBtn>
        </ScrollContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
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

const ScrollContainer = styled.div`
  position: fixed;
  right: 5%;
  bottom: 5%;
  z-index: 1;
`;

const ScrollToTopBtn = styled.button`
  font-weight: bold;
  font-size: 15px;
  padding: 15px 10px;
  background-color: #000;
  color: #fff;
  border: 1px solid rgb(210, 204, 193);
  border-radius: 50%;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.style.orange};
  }
`;

export default InfiniteBest;
