import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Mypage from './pages/Mypage/Mypage';
import PostUpload from './pages/PostUpload/PostUpload';
import Following from './pages/Following/Following';
import BestFeeds from './pages/BestFeeds/BestFeeds';
import Contents from './pages/Contents/Contents';
import Users from './pages/Users/Users';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/users/:id" element={<Users />} />
        <Route path="/post-upload" element={<PostUpload />} />
        <Route path="/contents/:id" element={<Contents />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
