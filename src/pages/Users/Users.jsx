import React from 'react';
import FollowDisplay from '../../components/FollowDisplay/FollowDisplay';
import styled from 'styled-components';
import UserContent from './Component/UserContent/UserContent';

const Users = () => {
  return (
    <>
      <UserContent />
      <FollowDisplay />
    </>
  );
};

export default Users;
