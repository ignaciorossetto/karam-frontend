import React from 'react'
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Card from "react-bootstrap/Card";
import './ItemCard.css'

const ItemCard = (param) => {
  return (
    <div className='itemCardContainer' >
        <KeyboardBackspaceIcon fontSize="large" />
      <Card
      className="itemDetail"
      >
        <Card.Img
          variant="top"
          src={param.newImage}
          style={{
            border: "solid 1px white",
            boxShadow: "-1px 1px 39px 1px rgb(0 0 0 / 84%)",
            WebkitBoxShadow: "-1px 1px 10px 1px rgb(219 219 219 / 84%)",
            MozBoxShadow: "-1px 1px 39px 1px rgba(0, 0, 0, 0.84)",
          }}
        />
        <Card.Body>
          <Card.Title as="h1">{param.newName}</Card.Title>
          <Card.Text>{param.newDescription}</Card.Text>
          <Card.Text>${param.newPrice.toLocaleString()}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default ItemCard