import React from 'react';
import styled from 'styled-components';
import ModifyInputs from '../ModifyInputs/ModifyInputs';

const ProfileModify = ({ profile }) => {
  return (
    <Container>
      <ModifyInputs profile={profile} />
    </Container>
  );
};

export default ProfileModify;

const Container = styled.div`
  display: flex;
  width: 65%;
`;
