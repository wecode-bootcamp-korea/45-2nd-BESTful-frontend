import React from 'react';
import styled from 'styled-components';
import ContentsBox from './components/ContentsBox';

const Container = styled.div``;

const Form = styled.form``;

const PostUpload = () => {
  return (
    <Container>
      <Form>
        <ContentsBox />
      </Form>
    </Container>
  );
};

export default PostUpload;
