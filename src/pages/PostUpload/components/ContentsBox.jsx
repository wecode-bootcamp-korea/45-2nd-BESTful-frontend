import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';
import theme from '../../../styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const ContentsBox = ({ data, datas, setDatas, index }) => {
  const [position, setPosition] = useState({});
  const [tags, setTags] = useState([]);
  const { img } = data;
  const imgRef = useRef([]);

  const savePhoto = () => {
    const file = imgRef.current[index].files[0];
    const copiedDatas = [...datas];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      copiedDatas[index].img = reader.result;
      setDatas(copiedDatas);
    };
  };

  const saveDesc = event => {
    const description = event.target.value;
    const copiedDatas = [...datas];
    copiedDatas[index].desc = description;
    setDatas(copiedDatas);
  };

  const tagging = () => {};

  const handleTag = e => {
    setPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  useEffect(() => {
    if (position.x) {
      setTags(prev => [...prev, position]);
    }
  }, [position]);

  return (
    <Container>
      <Contents>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          required
          ref={el => (imgRef.current[index] = el)}
          onChange={savePhoto}
        />
        {img ? (
          <UploadedImg>
            <img
              onClick={handleTag}
              className="uploadedImage"
              src={img}
              alt="업로드 이미지"
            />
            {tags.map((data, index) => {
              return (
                <PlusIcon
                  key={index}
                  icon={faCirclePlus}
                  style={{ top: data.y, left: data.x }}
                />
              );
            })}
            <div className="functionBox">
              <svg
                className="imgDelete"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                {/*<!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --> */}
                <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
              </svg>
              <button className="taggingBtn" onClick={tagging}>
                + 상품 태그하기
              </button>
            </div>
          </UploadedImg>
        ) : (
          <Image htmlFor="imageInput">
            <svg
              className="camera"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              {/*<!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) */}
              <path d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z" />
            </svg>
            <p className="text1">사진 올리기</p>
            <p className="text2">(*최대 3장까지)</p>
          </Image>
        )}
        <ContentDescription
          placeholder="사진에 대해 설명해주세요."
          required
          maxLength={1000}
          onChange={saveDesc}
        />
      </Contents>
    </Container>
  );
};

const Container = styled.div`
  ${variables.flex('column', 'center', 'center')}
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  #imageInput {
    display: none;
  }
  .uploadedImage {
    width: 550px;
    height: 550px;
    object-fit: cover;
    border-radius: 5px;
  }
`;

const Image = styled.label`
  margin: 0 24px 0 0;
  ${variables.flex('column', 'center', 'center')}
  width: 550px;
  height: 550px;
  border: 1px dashed #95a5a6;
  border-radius: 5px;
  background-color: #f6f8fa;
  color: #95a5a6;
  .camera {
    width: 40px;
    fill: #bdc3c7;
  }
  .camera,
  .text1,
  .text2 {
    margin-bottom: 5px;
  }
  cursor: pointer;
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

const UploadedImg = styled.div`
  width: 550px;
  position: relative;
  margin: 0 24px 0 0;
  .functionBox {
    padding: 0px 12px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    ${variables.flex('row', 'space-between', 'center')}
    .imgDelete {
      width: 20px;
      fill: white;
    }
    .taggingBtn {
      border: none;
      background-color: ${theme.orange};
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      cursor: pointer;
    }
  }
`;

const PlusIcon = styled(FontAwesomeIcon)`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 200px;
  left: 300px;
  color: ${theme.orange};
`;

export default ContentsBox;
