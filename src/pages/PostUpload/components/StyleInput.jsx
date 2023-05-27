import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
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
  currentIndex,
}) => {
  const tagDescRef = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const buyRef = useRef();
  const priceRef = useRef();

  const [season, setSeason] = useState('S/S');
  const [style, setStyle] = useState('Casual');
  const [newTags, setNewTags] = useState([]);
  const [isTagged, setIsTagged] = useState(false);

  const [required, setRequired] = useState(false);

  const [formCheck, setFormCheck] = useState({
    tagDesc: '',
    title: '',
    description: '',
    site: '',
    price: '',
  });

  const handleFormCheck = e => {
    setFormCheck({
      ...formCheck,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    const copiedTags = [...tags];
    const newTags = copiedTags.filter(tag => tag.id !== point.id);

    setTags(newTags);
    setSeason('S/S');
    setStyle('Casual');
    setModal(prev => !prev);
  };

  const addTagInfo = e => {
    e.preventDefault();
    const copiedDatas = [...datas];

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
      fileName: copiedDatas.find(data => data.id === currentIndex).imgFile.name,
    };

    copiedDatas.find(data => data.id === currentIndex).clothesInfo = [
      ...tags,
      currentTag,
    ];
    setDatas(copiedDatas);
    setNewTags([...tags, currentTag]);
    setTags([...tags, currentTag]);
    setSeason('S/S');
    setStyle('Casual');
    setModal(prev => !prev);
    setIsTagged(true);
  };

  const seasonInfo = e => {
    setSeason(e.target.value);
  };

  const styleInfo = e => {
    setStyle(e.target.value);
  };

  useEffect(() => {
    if (
      formCheck.tagDesc === '' ||
      formCheck.title === '' ||
      formCheck.description === '' ||
      formCheck.site === '' ||
      formCheck.price === ''
    ) {
      setRequired(true);
    } else {
      setRequired(false);
    }
  }, [formCheck]);

  return (
    <>
      {tags.map(tag => (
        <TagContainer
          datas={datas}
          setDatas={setDatas}
          tags={tags}
          setTags={setTags}
          newTags={newTags}
          setNewTags={setNewTags}
          key={tag.id}
          tag={tag}
          currentIndex={currentIndex}
        />
      ))}
      {modal && (
        <StyleInputContainer
          x={`${point.coordinateX}px`}
          y={`${point.coordinateY}px`}
        >
          <Input>
            <label htmlFor="tagDesc">
              <span className="itemInfo">태그 설명</span>
            </label>
            <Box className="info">
              <input
                required
                type="text"
                id="tagDesc"
                name="tagDesc"
                ref={tagDescRef}
                onChange={handleFormCheck}
              />
              {formCheck.tagDesc === '' && required && (
                <span className="warning">태그 정보를 입력해주세요.</span>
              )}
            </Box>
          </Input>
          <Input>
            <label htmlFor="title">
              <span className="itemInfo">상품 이름</span>
            </label>
            <Box className="info">
              <input
                required
                type="text"
                id="title"
                name="title"
                ref={nameRef}
                onChange={handleFormCheck}
              />
              {formCheck.title === '' && required && (
                <span className="warning">상품 이름을 입력해주세요.</span>
              )}
            </Box>
          </Input>
          <Input>
            <label htmlFor="description">
              <span className="itemInfo">설명</span>
            </label>
            <Box className="info">
              <input
                required
                type="text"
                id="description"
                name="description"
                ref={descRef}
                onChange={handleFormCheck}
              />
              {formCheck.description === '' && required && (
                <span className="warning">상품 설명 입력해주세요.</span>
              )}
            </Box>
          </Input>
          <Input className="seasonInput">
            <span className="itemInfo">시즌</span>
            <Box>
              <input
                required
                type="radio"
                id="ss"
                name="season"
                value="S/S"
                onClick={seasonInfo}
                checked={season === 'S/S' ? true : false}
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
          <Input className="styleInput">
            <span className="itemInfo">스타일</span>
            <Box>
              <input
                required
                type="radio"
                id="casual"
                name="style"
                value="Casual"
                onClick={styleInfo}
                checked={style === 'Casual' ? true : false}
              />
              <label htmlFor="casual">캐주얼</label>
              <input
                required
                type="radio"
                id="dandy"
                name="style"
                value="Dandy Look"
                onClick={styleInfo}
              />
              <label htmlFor="dandy">댄디</label>
              <input
                required
                type="radio"
                id="street"
                name="style"
                value="Street Look"
                onClick={styleInfo}
              />
              <label htmlFor="street">스트릿</label>
              <input
                required
                type="radio"
                id="sports"
                name="style"
                value="Sportswear"
                onClick={styleInfo}
              />
              <label htmlFor="sports">스포츠</label>
            </Box>
          </Input>
          <Input>
            <label htmlFor="site">
              <span className="itemInfo">구매 정보</span>
            </label>
            <Box className="info">
              <input
                required
                type="text"
                id="site"
                name="site"
                ref={buyRef}
                onChange={handleFormCheck}
              />
              {formCheck.site === '' && required && (
                <span className="warning">구매 정보를 입력해주세요.</span>
              )}
            </Box>
          </Input>
          <Input>
            <label htmlFor="price">
              <span className="itemInfo">가격</span>
            </label>
            <Box className="info">
              <input
                required
                type="number"
                id="price"
                name="price"
                ref={priceRef}
                onChange={handleFormCheck}
                placeholder="원"
              />
              {formCheck.price === '' && required && (
                <span className="warning">가격 입력해주세요.</span>
              )}
            </Box>
          </Input>
          <Button>
            <button disabled={required ? true : false} onClick={addTagInfo}>
              확인
            </button>
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
  span.itemInfo {
    padding-bottom: 10px;
  }
  .itemInfo {
    border-bottom: 1px solid black;
  }

  .seasonInput label,
  .styleInput label {
    margin-right: 10px;
    cursor: pointer;
  }

  input[type='radio'] {
    display: none;
  }

  input[type='radio'] + label {
    &:hover {
      color: #ff9f43;
    }
  }

  input[type='radio']:checked + label {
    color: ${theme.orange};
  }
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
  input {
    background-color: #d9d9d9;
    border: none;
    border-radius: 5px;
    outline: none;
    padding: 5px;
  }
  .info {
    display: flex;
    flex-direction: column;
    input {
      width: 250px;
    }
  }
`;

const Box = styled.div`
  width: 300px;
  margin-left: 30px;
  .warning {
    color: ${theme.orange};
    font-size: 12px;
    margin-top: 5px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  button {
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
