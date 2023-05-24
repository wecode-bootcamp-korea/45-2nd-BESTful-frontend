import React from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const FollowingBtn = ({ handleBtn, followOrNot, id }) => {
  return (
    <FollowBtn onClick={handleBtn} select={followOrNot}>
      {followOrNot ? '팔로잉' : '팔로우'}
    </FollowBtn>
  );
};

const FollowBtn = styled.button`
  width: 80px;
  height: 30px;
  border-radius: 5px;
  background-color: ${props => (props.select ? theme.white : theme.orange)};
  outline: none;
  border: ${props => (props.select ? '1px solid black' : 'none')};
  font-weight: bold;
  font-size: ${props => props.size};
  color: ${props => (props.select ? theme.black : theme.white)};
`;

export default FollowingBtn;
