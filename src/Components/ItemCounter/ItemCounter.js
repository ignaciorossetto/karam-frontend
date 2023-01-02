import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./ItemCounter.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ItemCounter = ({ stock, handler}) => {

  let [number, setNumber] = useState(1);
  let [herestock, setHereStock] = useState(stock)

  useEffect(()=>{
    setHereStock(stock)
  }, [stock])

  const onAdd = () => {
    setNumber((number = number + 1));
  };
  const onSub = () => {
    setNumber((number = number - 1));
  };

  const handleAddToCart = () => {
    handler(number);
    setNumber(1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button
        variant="primary"
        onClick={onAdd}
        disabled={herestock === 0 || number === herestock ? true : false}
      >
        +
      </Button>
      <Card.Text style={{ margin: "7px", marginBottom: "0px" }}>
        {herestock === 0 ? 0 : number}
      </Card.Text>
      <Button
        variant="primary"
        onClick={onSub}
        disabled={herestock === 0 || number === 1 ? true : false}
        style={{ margin: "0px", marginRight: "10px" }}
      >
        -
      </Button>

      {herestock === 0  ? (
        <p className="text-center" style={{ margin: "0px" }}>
          Sin stock!
        </p>
      ) :
        <div className="toCartLink">
          {" "}
          <AddShoppingCartIcon
            fontSize="large"
            onClick={handleAddToCart}
            style={{ cursor: "pointer" }}
          />{" "}
        </div>
      }
    </div>
  );
};

export default ItemCounter;
