import React, { useContext } from "react";
import CartSummary from "../CartSummary/CartSummary";
import "./CheckOut.css";
import ShippingInfo from "./ShippingInfo/ShippingInfo";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext/CartContext";

const CheckOut = () => {
  const { cart } = useContext(CartContext);
  return (
    <>
      {cart.length === 0 ? (
        <>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "50px",
              marginTop: "75px",
            }}
          >
            No hay nada en el carrito!
          </h1>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              textAlign: "end",
              marginBottom: "50px",
              marginRight: "75px",
            }}
          >
            <Link to="/" style={{textDecoration:'none'}}>
              <h2 style={{ marginRight: "5px" }}>Ir a </h2>
            </Link>
            <Link to="/">
              <HomeIcon fontSize="large" />
            </Link>
          </div>
        </>
      ) : (
        <>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "50px",
              marginTop: "75px",
            }}
          >
            Informacion de envío!
          </h1>
          <div
            style={{
              textAlign: "end",
              marginBottom: "50px",
              marginRight: "75px",
            }}
          >
            <Link to="/">
               <HomeIcon fontSize="large" />
            </Link>
          </div>
          <div
            style={{
              margin: "0px 25px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <ShippingInfo className='shippingForm' />
            <div className='cartSummary'>
            <CartSummary />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CheckOut;
