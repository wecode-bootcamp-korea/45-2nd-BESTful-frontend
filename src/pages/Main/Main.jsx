import React from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import MainFooter from './components/MainFooter';
import FilterCategory from './components/FilterCategory';
import useFetch from '../../hooks/useFetch';
import styled from 'styled-components';

const Main = () => {
  ///////////////////////////////////////////////////////////
  // for dashboard

  const { loading, data, error } = useFetch([], '/data/dashboardData.json', {
    method: 'GET',
  });

  if (error) return alert(error);
  if (loading) return null;
  ///////////////////////////////////////////////////////////

  return (
    <Container>
      <FilterCategory />
      <MainSection>
        <DashboardWrapper>
          <Dashboard data={data} scale={1} />
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
