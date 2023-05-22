import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';
import styled from 'styled-components';

const Container = () => {
  return (
    <Wrapper>
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1050px;
  margin: 0 auto;
`;

export default Container;
