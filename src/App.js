import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import { URLS } from "./urls";
import Products from "./components/products";
import Cart from "./components/cart";
import Wishlist from "./components/wishlist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={URLS.PRODUCTS} replace />} />
        <Route path={URLS.PRODUCTS} element={<Products />} />
        <Route path={URLS.CART} element={<Cart />} />
        <Route path={URLS.WISHLIST} element={<Wishlist />} />
      </Routes>
    </>
  );
}

export default App;
