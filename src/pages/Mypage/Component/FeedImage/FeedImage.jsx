import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash as trash } from '@fortawesome/free-solid-svg-icons';
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

const deleteBtn = {
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

const FeedImage = ({ image, posting, feedGet, category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = e => {
    setIsOpen(e);
  };

  const deleteFeed = id => {
    let query = '';

    if (id) {
      query += 'feedId=' + id;
    }

    fetch(`/data/feedImage.json?${query}`, {
      method: 'DELETE',
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json;charset=utf-8',
      },
    });

    feedGet();
  };

  return (
    <Container>
      <Image src={`${image}`} alt="feedImage" />
      {category ? (
        <Trash>
          <Button onClick={() => handleModal(true)}>
            <FontAwesomeIcon icon={trash} size="xl" color="white" />
          </Button>
        </Trash>
      ) : (
        ''
      )}
      <Modal open={isOpen}>
        <Box sx={modalStyle}>
          <Typography sx={{ mt: 2 }}>징짜 날 삭제하실꾸에오?🥺</Typography>
          <Stack direction="row" spacing={3}>
            <Button
              variant="contained"
              sx={deleteBtn}
              onClick={() => {
                deleteFeed(posting.id);
                handleModal(false);
              }}
            >
              삭제
            </Button>
            <Button
              variant="contained"
              onClick={() => handleModal(false)}
              sx={cancelBtn}
            >
              취소
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
};

export default FeedImage;

const Container = styled.div`
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;

  &:hover {
    opacity: 50%;
    cursor: pointer;
  }
`;

const Image = styled.img`
  border-radius: 5px;
  width: 200px;
  height: 300px;

  &:hover {
    transform: scale(1.1);
  }
`;

const Trash = styled.button`
  position: absolute;
  padding: 0;
  border: none;
  right: 0;
  bottom: 10px;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;
