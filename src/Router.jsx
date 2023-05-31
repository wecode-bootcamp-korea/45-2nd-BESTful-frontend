import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Mypage from './pages/Mypage/Mypage';
import PostUpload from './pages/PostUpload/PostUpload';
import Contents from './pages/Contents/Contents';
import Users from './pages/Users/Users';
import Nav from './components/Nav/Nav';
import Container from './components/Container/Container';
import Best from './pages/Best/Best';
import Following from './pages/Following/Following';
import MainInfinite from './pages/Main/MainInfinite';
import InvalidAccess from './pages/Contents/InvalidAccess';

const Router = () => {
  const location = useLocation();

  const renderNav = () => {
    if (location.pathname !== '/login') {
      return <Nav />;
    }
  };

  return (
    <>
      {renderNav()}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Container />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/users/:id" element={<Users />} />
          <Route path="/post-upload" element={<PostUpload />} />
          <Route path="/contents/:id" element={<Contents />} />
          <Route path="*" element={<InvalidAccess />} />
        </Route>
        <Route path="/best" element={<Best />} />
        <Route path="/" element={<MainInfinite />} />
        <Route path="/:userId/following" element={<Following />} />
      </Routes>
    </>
  );
};

export default Router;
