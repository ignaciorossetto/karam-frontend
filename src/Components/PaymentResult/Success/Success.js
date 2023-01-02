import React, { useEffect, useContext, useState } from "react";
import { CartContext } from "../../../Context/CartContext/CartContext";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { db } from "../../../Utilities/firebase/firebase";
import { doc, updateDoc, increment } from "firebase/firestore";
import HomeIcon from "@mui/icons-material/Home";


const Success = ({ info }) => {
  const { cart, setCart, setClientInfo, clientInfo } = useContext(CartContext);
  const [variableProvisoria, setVariableProvisoria] = useState(cart)
  const [variableProvisoria1, setVariableProvisoria1] = useState(clientInfo)
  useEffect(() => {
    decreaseStockFromDB();
  }, []);

  const decreaseStockFromDB = async () => {
    cart.forEach(async ({ id, quantity }) => {
      const docRef = doc(db, "products", id);
      await updateDoc(docRef, {
        stock: increment(quantity * -1),
      });
    });
    setVariableProvisoria(cart)
    setVariableProvisoria1(clientInfo)
    setCart([]);
    // setClientInfo({});
  };
  return (
    <>
      {Object.entries(variableProvisoria1).length === 0 && variableProvisoria.lenght === 1 ? (
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
          <h1 style={{
              textAlign: "center",
              marginBottom: "50px",
              marginTop: "75px",
            }}>Felicitaciones! Tu compra ha sido aprobada!</h1>
          <h2 className="mt-2">
            Numero de orden:{" "}
            <span style={{ fontWeight: "bolder" }}>{info.docID}</span>
          </h2>
          <div className="d-flex flex-column align-items-start mt-5">
            <p>
              Te enviaremos el comprobante de pago, junto con el resumen de tu
              compra a:{" "}
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {info.clientinfo === undefined
                  ? "Loading..."
                  : info.clientinfo.email}{" "}
              </span>
            </p>
            <p>No olvides revisar el correo no deseado/spam.</p>
            <p>
              Si elegiste envio a domicilio, te enviaremos al mail el numero de
              tracking pronto.
            </p>
            <p>
              De no recibir el email de confirmacion de compra comunicate a al
              whatsapp que se encuentra en nuestra seccion de
            </p>
            <Link to="/" className="mt-3">
              <Button>Volver a Home</Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Success;
