import "./App.css";
import ItemDetailContainer from "./Components/ItemDetailContainer/ItemDetailContainer";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import ItemListContainer from "./Components/ItemListContainer/ItemListContainer";
import Nosotros from "./Components/Nosotros/Nosotros";
import Contacto from "./Components/Contacto/Contacto";
import CartProvider from "./Context/CartContext/CartContext";
import CheckOut from "./Components/CheckOut/CheckOut";
import PaymentInfo from "./Components/PaymentInfo/PaymentInfo";
import PageLayout from "./Components/PageLayOut/PageLayOut";
import PaymentResult from "./Components/PaymentResult/PaymentResult";
import AddProduct from "./Components/AddProduct/AddProduct";
import ProductManagerContainer from "./Components/ProductManagerContainer/ProductManagerContainer";
import ModifyItemContainer from './Components/ModifyItemContainer/ModifyItemContainer'
import LogIn from "./Components/LogIn/LogIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route element={<PageLayout/>}>
              <Route path="/" element={<Home />} />
              <Route
                path="/products/category/:category"
                element={<ItemListContainer />}
              />
              <Route path="/product/:id" element={<ItemDetailContainer />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/" element={<ProductManagerContainer />} />
              <Route path="/admin/:id" element={<ModifyItemContainer />} />
              <Route path="/admin/login" element={<LogIn/>} />
            </Route>
            <Route path="/paymentresult" element={<PaymentResult />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/checkout/payment" element={<PaymentInfo />} />
          </Routes>
          <Footer/>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
