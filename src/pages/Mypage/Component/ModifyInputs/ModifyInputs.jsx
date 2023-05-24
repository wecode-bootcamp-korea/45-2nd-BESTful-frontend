import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  height: 150,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const changeBtn = {
  backgroundColor: '#222222',

  '&:hover': {
    backgroundColor: '#FE4600',
  },
};

const cancelBtn = {
  backgroundColor: '#FE4600',

  '&:hover': {
    backgroundColor: '#222222',
  },
};

const ModifyInputs = ({ profile }) => {
  const [textLength, setTextLength] = useState(0);
  const [changeSex, setChangeSex] = useState('');
  const [cellphone, setCellPhone] = useState(profile.cellphone);
  const [userName, setUserName] = useState(profile.userName);
  const [biography, setBiography] = useState(profile.bio);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = e => {
    setIsOpen(e);
  };

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
      setUserName(profile.userName);
    }
  };

  const acceptNumber = e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
  };

  const replacePage = () => {
    window.location.reload();
  };

  const activateButton = cellphone.length === 11 && changeSex !== '';

  const postProfile = () => {
    const url = `http://10.58.52.204:3700/users/edit`;

    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: localStorage.getItem('resToken'),
      },
      body: JSON.stringify({
        userName: userName,
        cellphone: cellphone,
        sex: changeSex,
        bio: biography,
      }),
    }).then(res => res.json());
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
          placeholder={`${profile?.userName}`}
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
          onInput={acceptNumber}
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
      <Alert>* 필수 선택</Alert>
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
              if (value === '') {
                setBiography(profile.bio);
              }
            }}
          />
          <span>{textLength}/300</span>
        </Biography>
      </ModifyBox>
      <SubmitDiv>
        <SubmitButton
          disabled={!activateButton}
          onClick={() => {
            handleModal(true);
          }}
        >
          변경 확인
        </SubmitButton>
        <Modal open={isOpen}>
          <Box sx={modalStyle}>
            <Typography sx={{ mt: 2 }}>회원 정보를 수정할까요🤩</Typography>
            <Stack direction="row" spacing={3}>
              <Button
                variant="contained"
                sx={changeBtn}
                onClick={() => {
                  postProfile();
                  replacePage();
                }}
              >
                하잇❗
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleModal(false);
                }}
                sx={cancelBtn}
              >
                아니오
              </Button>
            </Stack>
          </Box>
        </Modal>

        <CancelButton onClick={replacePage}>취소</CancelButton>
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
