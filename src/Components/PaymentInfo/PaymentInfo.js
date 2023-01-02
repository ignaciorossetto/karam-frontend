import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import CartSummary from "../CartSummary/CartSummary";
import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MercadoPagoCheckOut from "../MercadoPagoCheckOut/MercadoPagoCheckOut";
import "./PaymentInfo.css";
import axios from "axios";

const PaymentInfo = () => {
  const navigate = useNavigate();
  const { clientInfo, cart, cartTotal, deleteClientInfo, deleteCart, deleteAllCart, deleteItemAll } =
  useContext(CartContext);
  const whatsappMessage = () => {
    let messageString = `
    
    ------ KARAM HECHO A MANO ------
  #ORDEN: 54654asdasdasd
  PRODUCTOS:
          `;
    cart.map((product) => {
      return (messageString += `-${product.name} x $${
        product.quantity
      } = $${(product.price * product.quantity).toLocaleString()} 
          `);
    });

    messageString += `
   TOTAL: $${cartTotal.toLocaleString()}

   INFORMACION PERSONAL Y DE ENVIO:
  
  - NOMBRE: ${clientInfo.fullname}
  - EMAIL: ${clientInfo.email}
  - CELULAR: ${clientInfo.cellphone}
  - DIRECCION: ${clientInfo.address} ${clientInfo.address_number}, ZIP: ${
      clientInfo.zipcode}
      ${clientInfo.floor !== undefined ? `, DEPTO: ${clientInfo.floor}-
      ${clientInfo.apartment} 
      ${clientInfo.other !== undefined ? `, OTRO:${
        clientInfo.other}` : '' 
      }` : '' }
  - METODO DE PAGO: TRANSFERENCIA BANCARIA
   `;

    const uriEncodedMessage = encodeURIComponent(messageString);
    return uriEncodedMessage;
  };
  const handleClick = async (metodopago) => {
    if (metodopago === "transferenciabancaria") {
      const object = {
        products: cart,
        shippingInfo: clientInfo,
        paymentInfo: {
          metodo: "transferencia",
          estado: "TRANSFERENCIA A CONFIRMAR",
        },
      };
      await axios.post("https://karamhechoamano-backend.onrender.com/api/carts/", object);
      try {
        await axios.patch("https://karamhechoamano-backend.onrender.com/api/products/sale", {"products": object.products})
        window.open(
          `https://wa.me/5493516330434?text=${whatsappMessage()}`,
          "_blank"
        );
        deleteClientInfo();
        deleteAllCart();
        navigate(`/paymentresult?status=in_process&orderdnr=54654asdasdasd`);
        return;
      } catch (error) {
        const responseProducts = error.response.data.products
        for (const element of responseProducts) {
          deleteItemAll(element.id)
        }
        navigate(`/paymentresult?status=failed&orderdnr=54654asdasdasd`, responseProducts);
        return
      }
    }
  };

  return (
    <>
      {cart.length === 0 || Object.entries(clientInfo).length === 0 ? (
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
            <Link to="/" style={{ textDecoration: "none" }}>
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
              marginBottom: "100px",
              marginTop: "75px",
            }}
          >
            Elegi el metodo de pago
          </h1>
          <div className="paymentContainer">
            <Link to="/checkout">
              <KeyboardBackspaceIcon fontSize="large" />
            </Link>
            <div>
              <h1 style={{ marginBottom: "20px" }}>Forma de pago</h1>
              <Accordion className="formadepagoContainer">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Mercado Pago!</Accordion.Header>
                  <Accordion.Body>
                    <MercadoPagoCheckOut />
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Transferencia bancaria</Accordion.Header>
                  <Accordion.Body>
                    <p>
                      Se redirigira a whatsapp para pasarte los datos bancarios!{" "}
                    </p>
                    <Button
                      onClick={() => handleClick("transferenciabancaria")}
                    >
                      Confirmar compra!
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="cartSummaryPayment">
              <CartSummary />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PaymentInfo;
