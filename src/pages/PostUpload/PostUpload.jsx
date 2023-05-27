import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ContentsBox from './components/ContentsBox';
import variables from '../../styles/variables';
import theme from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

const PostUpload = () => {
  const [datas, setDatas] = useState([
    { id: 1, contentUrl: '', imgFile: '', clothesInfo: [] },
  ]);
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);

  const imageRef = useRef([]);
  const onMoveImg = idx => {
    imageRef.current[idx].scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  useEffect(() => {
    if (datas[0].contentUrl.length === 0) {
      setPass(true);
    } else if (desc === '') {
      setPass(true);
    } else {
      setPass(false);
    }
  }, [datas, desc]);

  const postUpload = e => {
    e.preventDefault();

    const url = `http://10.58.52.185:3000/feeds/upload`;

    let formData = new FormData();
    formData.append('feedDescription', desc);
    for (let i = 1; i <= datas[datas.length - 1].id; i++) {
      formData.append(
        'contentsImage',
        datas.find(data => data.id === i).imgFile
      );
    }
    formData.append('feedInfo', JSON.stringify(datas));

    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('resToken'),
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        alert(`업로드 되었습니다!`);
        navigate('/');
      })
      .catch(error => {
        console.error(error);
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
        imgFile: '',
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
        <BoxContainer>
          <PreviewBox>
            <div className="previewBox">
              {datas.map((data, index) => (
                <div key={data.id}>
                  {data.contentUrl && (
                    <img
                      className="preview"
                      src={data.contentUrl}
                      alt="미리보기 사진"
                      onClick={() => onMoveImg(index)}
                    />
                  )}
                </div>
              ))}
            </div>
          </PreviewBox>
        </BoxContainer>
        <Box>
          <ContentsBoxContainer>
            {datas.map((data, index) => (
              <ContentsBox
                key={data.id}
                img={data.contentUrl}
                datas={datas}
                setDatas={setDatas}
                index={datas.length - 1}
                currentIndex={data.id}
                pass={pass}
                imgIndex={index}
                imageRef={imageRef}
              />
            ))}
          </ContentsBoxContainer>
          <ContentDescriptionBox>
            <ContentDescription
              placeholder="사진에 대해 설명해주세요."
              required
              maxLength={1000}
              onChange={saveDesc}
              value={desc}
            />
            {pass && desc === '' && (
              <span className="uploadWarning">설명을 입력해주세요.</span>
            )}
            <UploadBtn>
              <button
                disabled={pass ? true : false}
                className="uploadBtn"
                onClick={postUpload}
              >
                올리기
              </button>
            </UploadBtn>
          </ContentDescriptionBox>
        </Box>
      </Form>
      {datas[datas.length - 1].contentUrl && datas.length <= 2 && (
        <Add onClick={handleAdd}>
          <span>추가하기</span>
        </Add>
      )}
    </Container>
  );
};

const Container = styled.div``;

const Box = styled.div`
  display: flex;
  .uploadWarning {
    line-height: 30px;
    font-size: 14px;
    color: ${theme.orange};
  }
`;

const Form = styled.form`
  width: 950px;
  display: flex;
  .previewBox {
    position: fixed;

    .preview {
      margin-bottom: 10px;
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 5px;
    }
  }
`;

const PreviewBox = styled.div`
  margin-right: 12px;
  width: 60px;
`;

const BoxContainer = styled.div``;

const ContentsBoxContainer = styled.div`
  margin: 0;
`;

const ContentDescriptionBox = styled.div`
  margin-bottom: 20px;
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

const UploadBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  .uploadBtn {
    margin-top: 20px;
    border: none;
    background-color: ${theme.orange};
    color: white;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Add = styled.button`
  width: 950px;
  margin-left: 70px;
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
