import React, {useContext, useState, useEffect} from "react";
import Card from "react-bootstrap/Card";
import ItemCounter from "../../ItemCounter/ItemCounter";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Context/CartContext/CartContext";
import './ItemDetail.css'

const ItemDetail = ({ singleProduct }) => {

  const { addToCart, deleteItemInfo, cart, setDeleteItemInfo, deleteAllCartBool, deleteAllItems, setDeleteAllCartBool, setDeleteAllItems } = useContext(CartContext);
  let [sstock , setSstock] = useState(singleProduct.stock)
  const handleClickedChild = (value) => {
    addToCart(
      singleProduct.id,
      singleProduct.name,
      singleProduct.price,
      singleProduct.image,
      value,
      singleProduct.id
    );
    setSstock(singleProduct.stock -= value)
  };

  useEffect(()=>{
    if(deleteItemInfo === singleProduct.id){
      setSstock(singleProduct.stock += 1)
      setDeleteItemInfo()
    }
    if(deleteAllCartBool === true) {
      const index = deleteAllItems.findIndex(({id})=> id === singleProduct.id)
      if(index !== -1){
        const value = deleteAllItems[index].quantity
        setSstock(singleProduct.stock += value)
      }
      setDeleteAllCartBool(false)
      setDeleteAllItems([])
    }
  }, [cart])


  

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Link to={`/products/category/${singleProduct.category}`}>
        <KeyboardBackspaceIcon fontSize="large" />
      </Link>
      <Card
      className="itemDetail"
      >
        <Card.Img
          variant="top"
          src={singleProduct.image}
          style={{
            border: "solid 1px white",
            boxShadow: "-1px 1px 39px 1px rgb(0 0 0 / 84%)",
            WebkitBoxShadow: "-1px 1px 10px 1px rgb(219 219 219 / 84%)",
            MozBoxShadow: "-1px 1px 39px 1px rgba(0, 0, 0, 0.84)",
          }}
        />
        <Card.Body>
          <Card.Title as="h1">{singleProduct.name}</Card.Title>
          <Card.Title as="h4">{singleProduct.medidas}</Card.Title>
          <Card.Text>PRECIO: ${singleProduct.price.toLocaleString()}</Card.Text>
          <Card.Text>Stock: {singleProduct.stock}</Card.Text>
          <ItemCounter stock={sstock} handler={handleClickedChild}/>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ItemDetail;
