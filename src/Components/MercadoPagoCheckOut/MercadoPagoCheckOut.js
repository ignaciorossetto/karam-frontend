import React, { useEffect, useState, useContext } from "react";
import { useMercadopago } from "react-sdk-mercadopago";
import { CartContext } from "../../Context/CartContext/CartContext";
import axios from 'axios'


export default function Checkout() {
  const [preferenceId, setPreferenceId] = useState();
  const { clientInfo, cart } =
    useContext(CartContext);
  const mercadopago = useMercadopago.v2(
    "TEST-426d1bf0-e2c8-4b98-bd4b-9f891c7cf31a",
    {
      locale: "es-AR",
    }
  );

  useEffect(() => {
    const getPrefIf = async () => {
      try {
        const response = await fetch("https://karamhechoamano-backend.onrender.com/api/mercadopago", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        });
        const data = await response.json();
        document.getElementsByClassName("cho-container")[0].innerHTML = "";
        setPreferenceId(data.id);
        mercadopago.checkout({
          preference: {
            id: data.id,
          },
          render: {
            container: ".cho-container",
            label: "Mercado Pago!",
          },
        });
      } catch (error) {
        document.getElementsByClassName("cho-container")[0].innerHTML = `
        <h5>No se puede pagar con este medio!</h5>`;
      }
    };

    getPrefIf();

  }, [mercadopago]);

  const handleClick = async () => {
    const object = {
      products: cart,
      shippingInfo: clientInfo,
      paymentInfo: {
        metodo: "mercadopago",
        estado: "ESPERANDO RESPUESTA DE MERCADOPAGO",
        preference_id: preferenceId,
        merchant_order:'',
        payment_id:''
      },
    };
    await axios.post("https://karamhechoamano-backend.onrender.com/api/carts/", object);
  

  };

  return (
    <div>
      <div className="cho-container" onClick={handleClick} />
    </div>
  );
}
