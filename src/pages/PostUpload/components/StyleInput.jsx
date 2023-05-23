import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
import TagContainer from './TagContainer';

const StyleInput = ({
  datas,
  setDatas,
  tags,
  setTags,
  point,
  modal,
  setModal,
  index,
}) => {
  const tagDescRef = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const buyRef = useRef();
  const priceRef = useRef();

  const [season, setSeason] = useState('');
  const [style, setStyle] = useState('');
  const [newTags, setNewTags] = useState([]);
  const [isTagged, setIsTagged] = useState(false);

  const handleClose = () => {
    const copiedTags = [...tags];
    const newTags = copiedTags.filter(tag => tag.id !== point.id);

    setTags(newTags);
    setModal(prev => !prev);
  };

  const addTagInfo = e => {
    e.preventDefault();
    const currentTag = {
      id: point.id,
      coordinateX: point.coordinateX,
      coordinateY: point.coordinateY,
      style: style,
      season: season,
      tagContent: tagDescRef.current.value,
      clothName: nameRef.current.value,
      clothBuyingLink: buyRef.current.value,
      clothInformation: descRef.current.value,
      clothPrice: priceRef.current.value,
    };

    const copiedDatas = [...datas];

    copiedDatas[index - 1].clothesInfo = [...newTags, currentTag];
    setDatas(copiedDatas);
    setNewTags([...newTags, currentTag]);
    setTags([...newTags, currentTag]);
    setModal(prev => !prev);
    setIsTagged(true);
  };

  const seasonInfo = e => {
    setSeason(e.target.value);
  };

  const styleInfo = e => {
    setStyle(e.target.value);
  };

  return (
    <>
      {tags.map(tag => (
        <TagContainer key={tag.id} tag={tag} />
      ))}
      {modal && (
        <StyleInputContainer
          x={`${point.coordinateX}px`}
          y={`${point.coordinateY}px`}
        >
          <Input>
            <label htmlFor="tagDesc">태그 설명</label>
            <Box>
              <input
                required
                type="text"
                id="tagDesc"
                name="tagDesc"
                ref={tagDescRef}
              />
            </Box>
          </Input>
          <Input>
            <label htmlFor="title">상품 이름</label>
            <Box>
              <input
                required
                type="text"
                id="title"
                name="title"
                ref={nameRef}
              />
            </Box>
          </Input>
          <Input>
            <label htmlFor="description">설명</label>
            <Box>
              <input
                required
                type="text"
                id="description"
                name="description"
                ref={descRef}
              />
            </Box>
          </Input>
          <Input>
            <span>시즌</span>
            <Box>
              <input
                required
                type="radio"
                id="ss"
                name="season"
                value="S/S"
                onClick={seasonInfo}
              />
              <label htmlFor="ss">S/S</label>
              <input
                required
                type="radio"
                id="fw"
                name="season"
                value="F/W"
                onClick={seasonInfo}
              />
              <label htmlFor="fw">F/W</label>
            </Box>
          </Input>
          <Input>
            <span>스타일</span>
            <Box>
              <input
                required
                type="radio"
                id="casual"
                name="style"
                value="Casual"
                onClick={styleInfo}
              />
              <label htmlFor="casual">캐주얼</label>
              <input
                required
                type="radio"
                id="dandy"
                name="style"
                value="Dandy"
                onClick={styleInfo}
              />
              <label htmlFor="dandy">댄디</label>
              <input
                required
                type="radio"
                id="street"
                name="style"
                value="Street"
                onClick={styleInfo}
              />
              <label htmlFor="street">스트릿</label>
              <input
                required
                type="radio"
                id="sports"
                name="style"
                value="Sports"
                onClick={styleInfo}
              />
              <label htmlFor="sports">스포츠</label>
            </Box>
          </Input>
          <Input>
            <label htmlFor="site">구매 정보</label>
            <Box>
              <input required type="text" id="site" name="site" ref={buyRef} />
            </Box>
          </Input>
          <Input>
            <label htmlFor="price">가격</label>
            <Box>
              <input
                required
                type="number"
                id="price"
                name="price"
                ref={priceRef}
              />
            </Box>
          </Input>
          <Button>
            <span onClick={addTagInfo}>확인</span>
          </Button>
          <Close onClick={handleClose}>
            <FontAwesomeIcon
              icon={faTimes}
              size="2s"
              style={{ color: '#fe4600' }}
            />
          </Close>
        </StyleInputContainer>
      )}
    </>
  );
};

const StyleInputContainer = styled.div`
  top: ${props => props.x};
  left: ${props => props.y};
  width: 430px;
  position: absolute;
  background-color: white;
  padding: 50px 0 0 20px;
  border-radius: 10px;
  border: 1px solid gray;
  transform: translate(-50%, -50%);
  top: ${props => props.y};
  left: ${props => props.x};
  z-index: 5;
`;

const Input = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Box = styled.div`
  width: 300px;
  margin-left: 30px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  span {
    text-align: center;
    width: 50px;
    border: none;
    background-color: ${theme.orange};
    color: white;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default StyleInput;
