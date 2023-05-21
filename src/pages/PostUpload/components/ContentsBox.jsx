import React from 'react';
import styled from 'styled-components';
import variables from '../../../styles/variables';

const ContentsBox = () => {
  return (
    <Contents>
      <input id="imageInput" type="file" accept="image/*" required />
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
      <ContentDescription
        placeholder="사진에 대해 설명해주세요."
        required
        maxLength={1000}
      />
    </Contents>
  );
};

const Contents = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  #imageInput {
    display: none;
  }
`;

const Image = styled.label`
  ${variables.flex('column', 'center', 'center')}
  width: 460px;
  height: 280px;
  background-color: white;
  margin: 0 12px;
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
  width: 460px;
  height: 200px;
  margin: 0 12px;
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

export default ContentsBox;
