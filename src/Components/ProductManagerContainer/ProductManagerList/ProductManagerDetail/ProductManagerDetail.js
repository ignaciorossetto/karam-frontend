import React, {useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./ProductManagerDetail.css";
import Form from "react-bootstrap/Form";
import axios from 'axios'

const ProductManagerDetail = ({ item }) => {
  const [show, setShow] = useState(item.disponible);



  const handleSwitch = async(e)=> {

    const obj = {
      disponible: !e.target.checked
    }
    await axios.put(`http://127.0.0.1:5000/api/products/${item.id}`, obj)
  }


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: "18rem", border: "none" }}>
        <Card.Img
          className="cardImgM"
          variant="top"
          src={item.image}
          style={{
            border: "solid 1px white",
            boxShadow: "-1px 1px 39px 1px rgb(0 0 0 / 84%)",
            WebkitBoxShadow: "-1px 1px 10px 1px rgb(219 219 219 / 84%)",
            MozBoxShadow: "-1px 1px 39px 1px rgba(0, 0, 0, 0.84)",
          }}
        />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>PRECIO: ${Number(item.price).toLocaleString()}</Card.Text>
          <Card.Text>STOCK: {Number(item.stock)}</Card.Text>
          <Card.Text>DESCRIPCION: {item.medidas}</Card.Text>
          <div style={{display:'flex', flexDirection:'row'}}>

          <Link to={`/admin/${item.id}`} style={{marginRight: '10px'}}>
            <Button>Modificar</Button>
          </Link>
          <Form.Check
            className="checkForm"
            onClick={() => {
              setShow(!show)
            }}
            type="switch"
            id="custom-switch"
            label={show ? 'Visible' : 'No Visible'} 
            checked={show ? false : true}
            onChange={handleSwitch}    
                />
                

            </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProductManagerDetail;
