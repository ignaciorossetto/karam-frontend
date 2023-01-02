import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";

const Failure = ({info}) => {
  return (
    <>
      <h1>Hubo un problema! Tu compra no ha sido aprobada!</h1>
      <div className="d-flex flex-column align-items-start mt-5">
        <Link to='/checkout'>
        <p>
          Haz click aqui para cambiar el metodo de pago.
        </p>
        </Link>

        <Link to="/" className="mt-3">
          <Button>Volver a Home</Button>
        </Link>
      </div>
    </>
  )
}

export default Failure