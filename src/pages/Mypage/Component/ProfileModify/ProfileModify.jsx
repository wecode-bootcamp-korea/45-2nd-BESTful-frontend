import React from 'react';
import styled from 'styled-components';
import ModifyInputs from '../ModifyInputs/ModifyInputs';

const ProfileModify = ({ profile, setMe }) => {
  return (
    <Container>
      <ModifyInputs profile={profile} setMe={setMe} />
    </Container>
  );
};

export default ProfileModify;

const Container = styled.div`
  display: flex;
  width: 65%;
`;
