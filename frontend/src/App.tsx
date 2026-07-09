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
import HomeSeller from './pages/seller/HomeSeller';
import ProductSeller from './pages/seller/ProductSeller';
import AddProductSeller from './pages/seller/AddProductSeller';
import OrderSeller from './pages/seller/OrderSeller';
import ProfileSeller from './pages/seller/ProfileSeller';
import HomeCourier from './pages/courier/HomeCourier';
import SearchJobCourier from './pages/courier/SearchJobCourier';
import HistoryCourier from './pages/courier/HistoryCourier';
import ProfileCourier from './pages/courier/ProfileCourier';
import FavoriteBuyer from './pages/buyer/FavoriteBuyer';
import ProductDetail from './pages/buyer/ProductDetail';
import FavoriteGuest from './pages/buyer/FavoriteGuest';
import ProductDetailGuest from './pages/buyer/ProductDetailGuest';
import CheckoutGuest from './pages/buyer/CheckoutGuest';

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
        <Route path="/detail-produk-guest" element={<ProductDetailGuest />} />
        <Route path="/dompet" element={<WalletGuest />} />
        <Route path='/favorit-guest' element={<FavoriteGuest />} />
        <Route path="/keranjang" element={<CartGuest />} />
        <Route path="/pesan" element={<ChatGuest />} />
        <Route path="/profil" element={<ProfileGuest />} />
        <Route path="/tulis-ulasan" element={<WriteReviewGuest />} />
        <Route path="/checkout-guest" element={<CheckoutGuest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pilih-peran" element={<RoleSelection />} />
        <Route path="/beranda-pembeli" element={<HomeBuyer />} />
        <Route path="/dompet-pembeli" element={<WalletBuyer />} />
        <Route path="/favorit" element={<FavoriteBuyer />} />
        <Route path="/profil-pembeli" element={<ProfileBuyer />} />
        <Route path="/keranjang-pembeli" element={<CartBuyer />} />
        <Route path="/pesan-pembeli" element={<ChatBuyer />} />
        <Route path="/checkout" element={<CheckoutBuyer />} />
        <Route path="/beranda-penjual" element={<HomeSeller />} />
        <Route path="/produk-penjual" element={<ProductSeller />} />
        <Route path="/tambah-produk-penjual" element={<AddProductSeller />} />
        <Route path="/pesanan-penjual" element={<OrderSeller />} />
        <Route path="/profil-penjual" element={<ProfileSeller />} />
        <Route path="/beranda-kurir" element={<HomeCourier />} />
        <Route path="/cari-job" element={<SearchJobCourier />} />
        <Route path="/riwayat-kurir" element={<HistoryCourier />} />
        <Route path="/profil-kurir" element={<ProfileCourier />} />
        <Route path="/detail-produk" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;