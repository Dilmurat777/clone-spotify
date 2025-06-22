import { Route, Routes } from 'react-router-dom';
import HomePage from './page/home/HomePage';
import AuthCallbackPage from './page/auth-callback/AuthCallbackPage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
import MainLayout from './layout/MainLayout';
import ChatPage from './page/chat/ChatPage';
import AlbumPage from './page/album/AlbumPage';
import AdminPage from './page/admin/AdminPage';
// import { axiosInstance } from './lib/axios';
import { Toaster } from 'react-hot-toast';

export default function App() {
  // const getSomeData = async () => {
  //   const res = await axiosInstance.get('/users', {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     },
  //   })
  //   console.log(res);

  // };
  return (
    <>
      <Routes>
        <Route
          path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={'/auth-callback'} />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
        <Toaster />
    </>
  );
}
