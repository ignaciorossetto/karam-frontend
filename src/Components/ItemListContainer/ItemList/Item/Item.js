import React, { useContext,useEffect,useState } from "react";
import Card from "react-bootstrap/Card";
import ItemCounter from "../../../ItemCounter/ItemCounter";
import { Link } from "react-router-dom";
import "./Item.css";
import { CartContext } from "../../../../Context/CartContext/CartContext";

const Item = ({ product }) => {
  const { addToCart, deleteItemInfo, cart, isInCart, setDeleteItemInfo, deleteAllCartBool, deleteAllItems, setDeleteAllCartBool, setDeleteAllItems } = useContext(CartContext);
  let [stock , setStock] = useState(product.stock)

  useEffect(()=>{
      if(isInCart(product.id)){
        const cartItem = cart.filter(prod => prod.id === product.id)
        const newStock = product.stock - cartItem[0].quantity
        setStock(newStock)
      }
  }, [])


  const handleClickedChild = (value) => {
    addToCart(
      product.id,
      product.name,
      product.price,
      product.image,
      value,
    );
    setStock(stock -= value)
  };


  useEffect(()=>{
    if(deleteItemInfo === product.id){
      setStock(stock += 1)
      setDeleteItemInfo()
    }
    if(deleteAllCartBool === true) {
      const index = deleteAllItems.findIndex(({id})=> id === product.id)
      if(index !== -1){
        const value = deleteAllItems[index].quantity
        setStock(stock += value)
      }
      setDeleteAllCartBool(false)
      setDeleteAllItems([])
    }
  }, [cart])


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "18rem", border: "none" }}>
        <Link to={`/product/${product.id}`}>
          <Card.Img
            className="cardImg"
            variant="top"
            src={product.image}
            style={{
              border: "solid 1px white",
              boxShadow: "-1px 1px 39px 1px rgb(0 0 0 / 84%)",
              WebkitBoxShadow: "-1px 1px 10px 1px rgb(219 219 219 / 84%)",
              MozBoxShadow: "-1px 1px 39px 1px rgba(0, 0, 0, 0.84)",
            }}
          />
        </Link>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>PRECIO: ${product.price.toLocaleString()}</Card.Text>
          <Card.Text>STOCK: {stock}</Card.Text>
          <ItemCounter stock={stock}  handler={handleClickedChild} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;
