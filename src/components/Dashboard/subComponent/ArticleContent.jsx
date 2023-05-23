import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ArticleContent = ({ content, length }) => {
  const [isOver, setIsOver] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const [str, setStr] = useState('');

  const handleIsMore = () => {
    setIsMore(prev => !prev);
  };

  const readContent = () => {
    const { str, over } = cutByte(content, length);
    setStr(str);
    setIsOver(over);
  };

  useEffect(() => {
    if (isMore) {
      readContent();
    } else {
      setStr(content);
    }
  }, [isMore]);

  useEffect(() => {
    readContent();
  }, []);

  return (
    <Wrapper>
      <div className="main">
        {str}
        {isOver && (
          <span className="more" onClick={handleIsMore}>
            {isMore ? ' 더보기' : ' 접어보기'}
          </span>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 16px 16px 10px;

  .main {
    line-height: 1.5;

    .more {
      margin: 0px 5px;
      background-color: white;
      border: none;
      color: #a4acb3;
      font-weight: bold;
      font-size: 15px;
      cursor: pointer;
    }
  }
`;

export default ArticleContent;

const cutByte = function (str, len) {
  let c = 0;
  for (let i = 0; i < str.length; i++) {
    c += str.charCodeAt(i) > 128 ? 2 : 1;
    if (c > len) return { str: str.substring(0, i) + ' ... ', over: true };
  }
  return { str: str, over: false };
};
