import React, {useState}  from 'react'
import axios from 'axios'
import AddProductForm from './AddProductForm/AddProductForm'
import ItemCard from './ItemCard/ItemCard'
import './AddProduct.css'


const AddProduct = () => {

  const [singleProduct, setSingleProduct] = useState({
    name: 'Nombre Ejemplo',
    price: 10000,
    medidas: 'Medidas 60x60cm',
    image: 'https://karamhechoamano-backend.onrender.com/static/images/multimedia/bolsos/bolso__6.jpeg'
  })

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
  

  return (
    <div className='addProductContainer' >
      <AddProductForm 
      newNameHandler={newNameHandler}
      newDescriptionHandler={newDescriptionHandler}
      newPriceHandler={newPriceHandler}
      newStockHandler={newStockHandler}
      newAvalabilitykHandler={newAvalabilitykHandler}
      newImageHandler={newImageHandler}/>

      <ItemCard 
      newName={newName}
      newDescription={newDescription}
      newPrice={newPrice}
      newImage={newImage}/>
    </div>
  )
}

export default AddProduct
