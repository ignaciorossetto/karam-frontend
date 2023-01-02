import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Link, useNavigate } from "react-router-dom";
import "./ModifyItemDetail.css";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import axios from "axios";
import Swal from 'sweetalert2'

const ItemDetail = ({ singleProduct }) => {

  const navigate = useNavigate();
  let [newName, setNewName] = useState(singleProduct.name)
  let [newDescription,  setNewDescription] = useState(singleProduct.medidas)
  let [newPrice, setNewPrice] = useState(Number(singleProduct.price))
  let [newStock, setNewStock] = useState(Number(singleProduct.stock))
  let [newAvailability, setNewAvailability] = useState(singleProduct.disponible)
  let [newImage, setNewImage] = useState(singleProduct.image)

 
  const newNameHandler = (e) => {
    if (e.target.value.length === 0) {
      setNewName(singleProduct.name)
      return
    }
    setNewName(e.target.value);
  }
  const newDescriptionHandler = (e) => {
    if (e.target.value.length === 0) {
      setNewDescription(singleProduct.medidas)
      return
    }
    setNewDescription(e.target.value);
  }
  const newPriceHandler = (e) => {
    if (e.target.value.length === 0) {
      setNewPrice(singleProduct.price)
      return
    }
    setNewPrice(e.target.value);
  }
  const newStockHandler = (e) => {
    if (e.target.value.length === 0) {
      setNewStock(singleProduct.stock)
      return
    }
    setNewStock(e.target.value);
  }
  const newAvalabilitykHandler = (e) => {
    if (e.target.value === 'Visible en la web') {
      setNewAvailability(true)
      return
    }
    setNewAvailability(false);
  }

  const newImageHandler = async(e) => {
    if (e.target.files[0] === undefined) {
      setNewImage(singleProduct.image)
      return
    }
    const newForm = new FormData()
    newForm.append('name', e.target.files[0].name)
    newForm.append('file', e.target.files[0])
    const response = await axios.patch('https://karamhechoamano-backend.onrender.com/api/products', newForm)
    setNewImage(response.data)
  }
  

  const clickHandler = async() => {
    let obj = {
      name: newName,
      medidas: newDescription,
      price: newPrice,
      stock: newStock,
      disponible: newAvailability
    }
    const response = await fetch(`https://karamhechoamano-backend.onrender.com/api/products/${singleProduct.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    Swal.fire({
      title: 'Modificaste el carrito!',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ir a Admin de productos!',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/admin")
      }
    })
  }

  const clickDeleteHandler = async() =>{
    Swal.fire({
      title: 'Seguro queres borrar el producto?',
      showDenyButton: true,
      confirmButtonText: 'No borrar!',
      denyButtonText: `Si borrar!`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
    if (result.isDenied) {
        Swal.fire(`Producto ${singleProduct.name} Eliminado!`).then(async (res)=>{
          await axios.delete(`https://karamhechoamano-backend.onrender.com/api/products/${singleProduct.id}`)
          navigate('/admin')
        })
      }
    })
  }
  

  return (
    <div className="modifyProductContainer"
     
    >
      <div style={{display: `flex`, flexDirection: 'row'}}>

      <Link to={`/admin`}>
        <KeyboardBackspaceIcon fontSize="large" />
      </Link>
      <Card className="itemDetailM">
        <Card.Img
          variant="top"
          src={newImage}
          style={{
            border: "solid 1px white",
            boxShadow: "-1px 1px 39px 1px rgb(0 0 0 / 84%)",
            WebkitBoxShadow: "-1px 1px 10px 1px rgb(219 219 219 / 84%)",
            MozBoxShadow: "-1px 1px 39px 1px rgba(0, 0, 0, 0.84)",
          }}
          />
        <Card.Body style={{ width: "500px" }}>
          <Card.Title as="h1">{newName}</Card.Title>
          <Card.Text>{newDescription}</Card.Text>
          <Card.Text>${newPrice.toLocaleString()}</Card.Text>
        </Card.Body>
      </Card>
          </div>
      <Table striped bordered hover className="tableDetail" style={{width: '80%'}}>
        <thead>
          <tr>
            <th>#</th>
            <th style={{width: '50%'}}>ACTUAL</th>
            <th style={{width: '50%'}}>NUEVO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>NOMBRE</th>
            <td>{singleProduct.name}</td>
            <td>
              <input type="text" onChange={newNameHandler}/>
            </td>
          </tr>
          <tr>
            <th>DESCRIPCION</th>
            <td>{singleProduct.medidas}</td>
            <td>
              <input type="text" onChange={newDescriptionHandler}/>
            </td>
          </tr>
          <tr>
            <th>PRECIO</th>
            <td>${Number(singleProduct.price).toLocaleString()}</td>
            <td>
              <input type="number" onChange={newPriceHandler}/>
            </td>
          </tr>
          <tr>
            <th>STOCK</th>
            <td>{Number(singleProduct.stock)}</td>
            <td>
              <input type="number" onChange={newStockHandler}/>
            </td>
          </tr>
          <tr>
            <th >IMAGEN</th>
            <td >.../{singleProduct.image.split('/')[7]}</td>
            <td>
              <input type="file" onChange={newImageHandler}/>
              <span style={{marginLeft:'10px'}}>
                <Button onClick={()=>setNewImage(singleProduct.image)}>Imagen original</Button>
                </span>
            </td>
          </tr>
          <tr>
            <th >DISPONIBLE</th>
            <td >{singleProduct.disponible === true ? 'Visible en la web' : 'No visible en la web'}</td>
            <td>
              <select onChange={newAvalabilitykHandler}>
              <option value="disponible" disabled selected hidden>Visible en la web ?</option>
                <option>Visible en la web</option>
                <option>No visible en la web</option>
              </select>
            </td>
          </tr>

        
        </tbody>
      </Table>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width:'50%'}}>
      <Button onClick={clickHandler}>Confirmar cambios!</Button>
      <Button onClick={clickDeleteHandler} variant="danger">Eliminar producto!</Button>
      </div>
    </div>
  );
};

export default ItemDetail;
