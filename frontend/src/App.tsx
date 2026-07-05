import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Splash from './pages/auth/Splash';
import HomeGuest from './pages/buyer/HomeGuest';
import WalletGuest from './pages/buyer/WalletGuest';
import CartGuest from './pages/buyer/CartGuest';
import ChatGuest from './pages/buyer/ChatGuest';
import ProfileGuest from './pages/buyer/ProfileGuest';
import WriteReviewGuest from './pages/buyer/WriteReviewGuest';
import Login from './pages/auth/Login';
import RoleSelection from './pages/buyer/RoleSelection';
import HomeBuyer from './pages/buyer/HomeBuyer';
import WalletBuyer from './pages/buyer/WalletBuyer';
import ProfileBuyer from './pages/buyer/ProfileBuyer';
import CartBuyer from './pages/buyer/CartBuyer';
import ChatBuyer from './pages/buyer/ChatBuyer';
import CheckoutBuyer from './pages/buyer/CheckoutBuyer';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeGuest />} />
        <Route path="/dompet" element={<WalletGuest />} />
        <Route path="/keranjang" element={<CartGuest />} />
        <Route path="/pesan" element={<ChatGuest />} />
        <Route path="/profil" element={<ProfileGuest />} />
        <Route path="/tulis-ulasan" element={<WriteReviewGuest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pilih-peran" element={<RoleSelection />} />
        <Route path="/beranda-pembeli" element={<HomeBuyer />} />
        <Route path="/dompet-pembeli" element={<WalletBuyer />} />
        <Route path="/profil-pembeli" element={<ProfileBuyer />} />
        <Route path="/keranjang-pembeli" element={<CartBuyer />} />
        <Route path="/pesan-pembeli" element={<ChatBuyer />} />
        <Route path="/checkout" element={<CheckoutBuyer />} />
      </Routes>
    </Router>
  );
}

export default App;