import React, { useState } from 'react';
import styled from 'styled-components';
import ContentsBox from './components/ContentsBox';
import variables from '../../styles/variables';

const PostUpload = () => {
  const [datas, setDatas] = useState([
    { id: 1, contentUrl: '', clothesInfo: [] },
  ]);
  const [desc, setDesc] = useState('');

  const postUpload = () => {
    const formData = new FormData();
    formData.append('feedDescription', desc);
    formData.append('contentUrls', datas);

    fetch('url', {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('resToken'),
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        console.log('성공:', result);
      })
      .catch(error => {
        console.error('실패:', error);
      });
  };

  const handleAdd = event => {
    event.preventDefault();
    if (datas.length > 2) return;
    setDatas(prev => [
      ...prev,
      {
        id: datas[datas.length - 1].id + 1,
        contentUrl: '',
        clothesInfo: [],
      },
    ]);
  };

  const saveDesc = event => {
    setDesc(event.target.value);
  };

  return (
    <Container>
      <Form>
        <Box>
          <ContentsBoxContainer>
            {datas.map(data => (
              <ContentsBox
                key={data.id}
                img={data.contentUrl}
                datas={datas}
                setDatas={setDatas}
                index={datas.length - 1}
                currentIndex={data.id}
              />
            ))}
          </ContentsBoxContainer>
          <ContentDescription
            placeholder="사진에 대해 설명해주세요."
            required
            maxLength={1000}
            onChange={saveDesc}
            value={desc}
          />
        </Box>
        {datas[datas.length - 1].contentUrl && datas.length <= 2 && (
          <Add onClick={handleAdd}>
            <span>추가하기</span>
          </Add>
        )}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 150px;
`;

const Box = styled.div`
  display: flex;
`;

const Form = styled.form`
  width: 950px;
`;

const ContentsBoxContainer = styled.div`
  margin: 0;
`;

const ContentDescription = styled.textarea`
  position: relative;
  width: 370px;
  height: 300px;
  outline-style: none;
  border: 1px solid #b2bec3;
  border-radius: 5px;
  padding: 10px 20px;
  display: flex;
  vertical-align: top;
  resize: none;
  &::placeholder {
    color: #95a5a6;
  }
`;

const Add = styled.button`
  width: 950px;
  margin: 0 auto;
  height: 30px;
  padding: 30px 0;
  font-size: 17px;
  ${variables.flex('row', 'center', 'center')}
  border: none;
  color: #858685;
  font-weight: 600;
  cursor: pointer;
`;

export default PostUpload;
