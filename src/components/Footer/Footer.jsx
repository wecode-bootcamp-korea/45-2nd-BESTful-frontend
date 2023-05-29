import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <Container>
      <FooterWrap>
        <TextWrap>
          <TextLeftWrap>
            <DivWrap>
              <Div1>고객센터</Div1>
              <Div2>></Div2>
            </DivWrap>
            <NumWrap>
              <PhoneNum>1234 - 0712</PhoneNum>
              <Time>09:00 ~ 18:00</Time>
            </NumWrap>

            <DayWrap>
              <Day>평일: 전체 문의 상담 가능</Day>
              <Day>주말∙공휴일: 오늘뭐입지 배송 및 결제 상담 가능</Day>
            </DayWrap>

            <LeftBottomWrap>
              <LeftBottom>
                <span>(주)오늘뭐입지 |</span>
                <Div>대표이사 박현아 |</Div>
                <span>서울 서초구 선릉로 위워크 10층</span>
              </LeftBottom>
              <ContactoneulmoipzicomContainer>
                <Contactoneulmoipzicom>
                  contact@oneulmoipzi.com | 사업자등록번호 000-11-112345
                  <Span>사업자정보확인</Span>
                </Contactoneulmoipzicom>
              </ContactoneulmoipzicomContainer>
              <div>통신판매업신고번호 제2000-서울선릉-000호</div>
            </LeftBottomWrap>
          </TextLeftWrap>

          <TextRightWrap>
            <TextRight>
              <InfoContents>
                <InfoWrap>
                  <Div>회사소개</Div>
                  <Div>채용정보</Div>
                  <Div>이용약관</Div>
                  <Div>공지사항</Div>
                  <Div>개인정보 처리방침</Div>
                </InfoWrap>
                <Adver>
                  <Div>제휴/광고 문의</Div>
                  <Div>상품광고 소개</Div>
                  <Div>고객의 소리</Div>
                </Adver>
                <Copy>
                  copyright 2023. Oneul, Co., LTD. All rights reserved. made by
                  <SeungMin>SeungMinOh</SeungMin>
                </Copy>
              </InfoContents>
            </TextRight>
          </TextRightWrap>
        </TextWrap>
      </FooterWrap>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  position: relative;
  height: 400px;
  font-family: 'Noto Sans', sans-serif;
`;

const FooterWrap = styled.div`
  position: absolute;
  bottom: 0;
  padding: 32px;
  width: 100%;
  background-color: #efefef;
`;

const TextWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const TextLeftWrap = styled.div`
  padding: 12px;
  width: 50%;
`;

const DivWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 300;
  width: 160px;
`;

const Div1 = styled.div`
  font-size: 32px;
  font-weight: 300;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
  }
`;

const Div2 = styled.div``;

const NumWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  margin-top: 20px;
`;

const PhoneNum = styled.div`
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
  }
`;

const Time = styled.div`
  font-size: 16px;
`;

const DayWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 16px;
  margin-top: 20px;
  height: 40px;
`;

const Day = styled.div``;

const LeftBottom = styled.div`
  display: flex;
  justify-content: space-between;
  width: 340px;
  font-size: 12px;
`;

const Div = styled.div`
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    transition-duration: 0.3s;
  }
`;
const SeungMin = styled.span`
  margin-left: 4px;
  :hover {
    color: red;
  }
`;
const ContactoneulmoipzicomContainer = styled.div`
  width: 380px;
`;

const Contactoneulmoipzicom = styled.span`
  font-weight: 300;
`;

const Span = styled.span`
  margin-left: 8px;
  font-weight: 600;
`;
const LeftBottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 80px;
  font-size: 12px;
  margin-top: 20px;
`;

const TextRightWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 50%;
`;

const TextRight = styled.div`
  flex-direction: column;
  align-items: center;

  width: 480px;
  padding: 16px;
  font-size: 12px;
`;

const InfoContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 120px;
  padding: 20px;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 420px;
`;

const Adver = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
`;

const Copy = styled.div`
  width: 420px;
  color: lightgray;
`;
