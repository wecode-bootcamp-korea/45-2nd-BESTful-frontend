import React from 'react';
import styled from 'styled-components';
import Dashboard from '../../components/Dashboard/Dashboard';
import MainFooter from './components/MainFooter';
import FilterCategory from './components/FilterCategory';

const Main = () => {
  return (
    <Container>
      <FilterCategory />
      <MainSection>
        <DashboardWrapper>
          <Dashboard />
          <Dashboard />
          <Dashboard />
        </DashboardWrapper>
        <MainFooter />
      </MainSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const MainSection = styled.section`
  width: 85%;
  display: flex;
  justify-content: space-between;
  padding: 0 120px;
`;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;

  width: 90%;
`;
export default Main;
