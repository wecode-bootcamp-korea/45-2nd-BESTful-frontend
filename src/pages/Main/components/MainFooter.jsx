import React from 'react';
import styled from 'styled-components';

const MainFooter = () => {
  return (
    <Container>
      {FOOTER_DATA.map(footer => {
        return <FooterItem key={footer.id}>{footer.title}</FooterItem>;
      })}
      <CopyRight>&copy; 2023. oneul, Co., LTD. All rights reserved</CopyRight>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 15px;
  width: 350px;
  margin-left: 100px;
  font-size: 13px;
  color: #bbb;
`;

const FooterItem = styled.div`
  display: flex;
  height: 5px;
`;

const CopyRight = styled.div`
  margin-top: 10px;
`;

export default MainFooter;

const FOOTER_DATA = [
  { id: 1, title: '회사소개' },
  { id: 2, title: '채용정보' },
  { id: 3, title: '이용약관' },
  { id: 4, title: '공지사항' },
  { id: 5, title: '개인정보 처리방침' },
  { id: 6, title: '제휴/광고 문의' },
  { id: 7, title: '상품광고 소개' },
  { id: 8, title: '고개의 소리' },
];
