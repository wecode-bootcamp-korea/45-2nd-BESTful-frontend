import React, { useState } from 'react';
import styled from 'styled-components';
import ContentsBox from './components/ContentsBox';
import variables from '../../styles/variables';

const PostUpload = () => {
  const [datas, setDatas] = useState([{ id: 1, img: '', desc: '' }]);

  const handleAdd = event => {
    if (datas.length > 2) return;
    event.preventDefault();
    setDatas(prev => [
      ...prev,
      { id: datas[datas.length - 1].id + 1, img: '', desc: '' },
    ]);
  };

  return (
    <Container>
      <Form>
        {datas.map(data => (
          <ContentsBox
            key={data.id}
            data={data}
            datas={datas}
            setDatas={setDatas}
            index={datas.length - 1}
          />
        ))}
        {datas[datas.length - 1].img && datas.length <= 2 && (
          <Add onClick={handleAdd}>
            <span>추가하기</span>
          </Add>
        )}
      </Form>
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form``;

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
