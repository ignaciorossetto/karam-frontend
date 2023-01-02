import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const InProcess = ({info}) => {
  return (
    <>
    <h1>Hubo un problema! Tu orden esta en estado: PENDIENTE!</h1>
    <h2>No te hagas problema, tu orden quedara pendiente durante 48hs hasta recibir la confirmacion del pago por parte de Mercado Pago.</h2>
    <h2 className="mt-2">Numero de orden: {info.docID}</h2>
    <div className="d-flex flex-column align-items-start mt-5">
      <p>
        En caso de aprobarse, te enviaremos el comprobante de pago, junto con el resumen de tu
        compra a: {info.shippingInfo === undefined ? 'Loading...' : info.shippingInfo.email}
      </p>
      <p>
        En caso de que no se apruebe, te enviaremos un email a: {info.shippingInfo === undefined ? 'Loading...' : info.shippingInfo.email}
        con un link para que puedas probar otro medio de pago.
      </p>
      <p>No olvides revisar el correo no deseado/spam.</p>
      <p>
        Muchas gracias!
      </p>
      <p>
        De no recibir el email de compra comunicate a al whatsapp que
        se encuentra en nuestra seccion de Contacto
      </p>
      <Link to="/" className="mt-3">
        <Button>Volver a Home</Button>
      </Link>
    </div>
  </>
  )
}

export default InProcess
