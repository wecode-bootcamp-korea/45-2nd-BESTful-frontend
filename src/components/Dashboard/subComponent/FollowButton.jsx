import React from 'react';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import theme from '../../../styles/theme';

const FollowButton = ({ following, setFollowing }) => {
  //팔로잉 클릭시 상태변경(팔로잉 통신)
  const handleFollow = () => {
    // fetch('http://10.58.52.108:3000/follower', {
    //   method: following ? 'DELETE' : 'POST',
    //   headers: {
    //     Authorization: localStorage.getItem('resToken'),
    //     'Content-Type': 'application/json;charset=utf-8',
    //   },
    // })
    //   .then(res => res.json())
    //   .then(res => console.log(res));

    setFollowing(prev => !prev);
  };

  return (
    <Follow onClick={handleFollow} isSelect={following}>
      {following ? (
        <FontAwesomeIcon icon={faPlus} />
      ) : (
        <FontAwesomeIcon icon={faCheck} />
      )}
      {following ? ' 팔로잉' : ' 팔로우'}
    </Follow>
  );
};

const Follow = styled.button`
  width: 80px;
  height: 30px;
  border: ${props => (props.isSelect ? '1px solid black' : 'none')};
  border-radius: 5px;
  background-color: ${props => (props.isSelect ? theme.white : theme.orange)};
  outline: none;
  font-weight: bold;
  color: ${props => (props.isSelect ? theme.black : theme.white)};
  cursor: pointer;
`;

export default FollowButton;
