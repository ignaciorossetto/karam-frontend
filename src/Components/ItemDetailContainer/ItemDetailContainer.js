import React, { useState, useEffect } from "react";
import ItemDetail from "./ItemDetail/ItemDetail";
import SpinnerComponent from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import axios from 'axios'

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);

  useEffect(() => {
    const fetchSingleProduct = async() => {
      const response = await axios.get(`https://karamhechoamano-backend.onrender.com/api/products/${id}`)
      setSingleProduct(response.data)
    }
    fetchSingleProduct()
  }, [id]);


  return (
    <>

      {singleProduct.length === 0 ? (
        <div className="d-flex justify-content-center">
          <SpinnerComponent />
        </div>
      ) : (
        <div>
          <ItemDetail singleProduct={singleProduct} />
        </div>
      )}
    </>
  );
};

export default ItemDetailContainer;
