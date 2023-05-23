import React, { useState } from 'react';
import styled from 'styled-components';

const ModifyInputs = ({ profile, setMe }) => {
  const [textLength, setTextLength] = useState(0);
  const [changeSex, setChangeSex] = useState('');
  const [cellphone, setCellPhone] = useState(profile.cellphone);
  const [userName, setUserName] = useState(profile.user_name);
  const [biography, setBiography] = useState(profile.bio);

  const handleRadio = e => {
    setChangeSex(e);
  };

  const handleCellphone = e => {
    const { value } = e.target;

    setCellPhone(value);
    if (value === '') {
      setCellPhone(profile.cellphone);
    }
  };

  const handleName = e => {
    const { value } = e.target;

    setUserName(value);
    if (value === '') {
      setUserName(profile.user_name);
    }
  };

  const activateButton = cellphone.length === 11 && changeSex !== '';

  const postProfile = () => {
    const url = ``;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        user_name: userName,
        cellphone: cellphone,
        sex: changeSex,
        bio: biography,
      }),
    }).then(res => res.json());
    alert('회원정보가 수정되었습니다');
  };

  return (
    <ProfileForm>
      <ModifyBox>
        <div>이메일</div>
        <span>{profile?.email}</span>
      </ModifyBox>
      <ModifyBox>
        <label for="userName">유저 네임</label>
        <ProfileInput
          type="text"
          id="userName"
          placeholder={`${profile?.user_name}`}
          onChange={handleName}
        />
      </ModifyBox>
      <ModifyBox>
        <label for="cellphone">휴대폰 번호</label>
        <ProfileInput
          type="text"
          id="cellphone"
          placeholder={`${profile?.cellphone}`}
          onChange={handleCellphone}
        />
      </ModifyBox>
      <Alert>- 를 제외하고 입력하시오</Alert>
      <ModifyBox>
        <span>성별</span>
        <div>
          <input
            type="radio"
            id="male"
            name="gender"
            onClick={() => handleRadio('male')}
          />
          <label for="male">남성</label>
          <input
            type="radio"
            id="female"
            name="gender"
            onClick={() => handleRadio('female')}
          />
          <label for="female">여성</label>
          <input
            type="radio"
            id="none"
            name="gender"
            onClick={() => handleRadio('none')}
          />
          <label for="none">선택하지 않음</label>
        </div>
      </ModifyBox>
      <ModifyBox>
        <Biography>
          <label for="bio">바이오그래피</label>
          <TextArea
            id="bio"
            placeholder="상태 메세지를 입력하세요"
            maxLength="300"
            onChange={e => {
              const { value } = e.target;

              setTextLength(value.length);
              setBiography(value);
            }}
          />
          <span>{textLength}/300</span>
        </Biography>
      </ModifyBox>
      <SubmitDiv>
        <SubmitButton disabled={!activateButton} onClick={postProfile}>
          변경 확인
        </SubmitButton>
        <CancelButton>취소</CancelButton>
      </SubmitDiv>
    </ProfileForm>
  );
};

export default ModifyInputs;

const ProfileForm = styled.div`
  margin: auto;
  width: 100%;
  height: 500px;
`;

const ModifyBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;

const ProfileInput = styled.input`
  border: none;
  background-color: transparent;
  width: 300px;
  height: 30px;

  &::placeholder {
    text-align: end;
  }
`;

const Biography = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  span {
    text-align: end;
    font-size: 14px;
    color: ${props => props.theme.style.middleGrey};
  }
`;

const TextArea = styled.textarea`
  border: none;
  background-color: transparent;
  margin: 20px 0;
  padding: 10px;
  height: 150px;
`;

const SubmitDiv = styled.div`
  text-align: center;
`;

const SubmitButton = styled.button`
  margin: 0 20px;
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
  background-color: ${props => {
    if (props.disabled) {
      return 'black';
    }
    return `${props.theme.style.orange}`;
  }};
  color: white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: black;
  }
`;

const CancelButton = styled.button`
  margin-left: 10px;
  border: none;
  border-radius: 3px;
  padding: 5px 7px;
  background-color: black;
  color: white;
  font-size: 15px;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.style.orange};
  }
`;

const Alert = styled.div`
  text-align: end;
  font-size: 12px;
  color: ${props => props.theme.style.orange};
`;
