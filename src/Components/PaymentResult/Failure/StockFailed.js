import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from 'react-bootstrap/Card';

const StockFailed = () => {
  const {
    state: { data },
  } = useLocation();
  return (
    <>
      <h1>Hubo un problema!</h1>
      <h2>No hay stock de los siguientes productos:</h2>
      <div className="d-flex flex-column align-items-start mt-5">
        {data.map((product) => {
          return (
            <Card style={{ width: "10rem" }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
              </Card.Body>
            </Card>
          );
        })}

        <Link to="/" className="mt-3">
          <Button>Volver a Home</Button>
        </Link>
      </div>
    </>
  );
};

export default StockFailed;
