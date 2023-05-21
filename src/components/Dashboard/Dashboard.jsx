import React from 'react';
import ProfileImage from '../ProfileImage/ProfileImage';
import styled from 'styled-components';
import variables from '../../styles/variables';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faC, faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  const src = '/images/Components/profileImage/brunch.jpg';
  return (
    <div className="dashboard">
      <Wrapper>
        <Head>
          <ProfileImage src={src} width={30} />
          <Bold> 미키</Bold>
        </Head>
        <Image src={src} />
        <Feed>글내용</Feed>
        <Tail>
          <FontAwesomeIcon icon={emptyHeart} size="2x" />
          <FontAwesomeIcon icon={faComment} size="2x" />
        </Tail>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  width: 552px;
  border: 1px solid black;
`;

const Head = styled.div`
  ${variables.flex('row', 'none')};
  height: 60px;
  padding: 15px 16px;
`;

const Bold = styled.div`
  font-weight: bold;
`;

const Image = styled.img`
  width: 100%;
`;

const Feed = styled.div`
  padding: 16px 16px 10px;
`;

const Tail = styled.div`
  ${variables.flex('row', 'space-between', 'center')};
  padding: 16px;
`;

export default Dashboard;
