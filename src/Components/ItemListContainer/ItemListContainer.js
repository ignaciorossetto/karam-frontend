import React, { useState, useEffect, useContext } from "react";
import ItemList from "./ItemList/ItemList";
import SpinnerComponent from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext/CartContext";


function ItemListContainer() {

  const {cart} = useContext(CartContext)
  const [productList, setProductList] = useState([]);
  const [itemListBool, setItemListBool] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    
    const fetchProducts = async() => {
      const response = await fetch(`https://karamhechoamano-backend.onrender.com/api/products/?category=${category}`);
      const data = await response.json()
      const data1 = data.filter((prod)=> prod.disponible === true)
      setProductList(data1.sort((a, b)=> a.product_id - b.product_id))
      setItemListBool(true);
    }
    fetchProducts()
    setItemListBool(false);

  }, [category]);

  return (
    <>
      <div>
        {itemListBool ? (
          <ItemList productList={productList} />
        ) : (
          <div className="d-flex justify-content-center">
            <SpinnerComponent />
          </div>
        )}
      </div>
    </>
  );
}

export default ItemListContainer;
