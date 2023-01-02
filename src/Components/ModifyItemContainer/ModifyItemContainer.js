import React, { useState, useEffect } from "react";
import ModifyItem from "./ModifyItem/ModifyItem";
import SpinnerComponent from "../Spinner/Spinner";
import { useParams } from "react-router-dom";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState([]);

  const fetchSingleDoc = async () => {
    const response = await fetch(`https://karamhechoamano-backend.onrender.com/api/products/${id}`)
    const data = await response.json()
    setSingleProduct(data);
  };

  useEffect(() => {
    fetchSingleDoc()
  }, [id]);


  return (
    <>
      {singleProduct.length === 0 ? (
        <div className="d-flex justify-content-center">
          <SpinnerComponent />
        </div>
      ) : (
        <div>
          <ModifyItem singleProduct={singleProduct} />
        </div>
      )}
    </>
  );
};

export default ItemDetailContainer;
